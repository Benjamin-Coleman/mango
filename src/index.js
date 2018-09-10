import React from 'react'
// import ReactDOM from 'react-dom'
import { hydrate } from 'react-dom'
import './index.css'
import App from './App'
import AppWrapper from './AppWrapper'
import RootContainer from './components/RootContainer/RootContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { preloadReady } from 'react-loadable'
import configureStore from './store'
import { ApolloProvider } from 'react-apollo'
import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { AUTH_TOKEN } from './constant'
import registerServiceWorker from './registerServiceWorker'

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const middlewareLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const tokenValue = localStorage.getItem(AUTH_TOKEN)
  // return the headers to the context so httpLink can read them
  operation.setContext({
    headers: {
      Authorization: tokenValue ? `Bearer ${tokenValue}` : ''
    }
  })
  return forward(operation)
})

// authenticated httplink
const httpLinkAuth = middlewareLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
    }
  }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLinkAuth
)

// apollo client setup
const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const token = localStorage.getItem(AUTH_TOKEN)

// Create Redux store and restore state from SSR.
const store = configureStore(window.__INITIAL_STATE__)

// Allow initial state to be garbage-collected.
delete window.__APOLLO_STATE__
delete window.__INITIAL_STATE__

const ClientApp = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <AppWrapper helmetContext={{}} />
      </Router>
    </Provider>
  </ApolloProvider>
)
// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <Provider store={store}>
//       {/* <RootContainer token={token} /> */}
//       {/* <Router>
//       <Route path="/" component={App} />
//     </Router> */}
//       <Router>
//         <AppWrapper helmetContext={{}} />
//       </Router>
//     </Provider>
//   </ApolloProvider>,
//   document.getElementById('root')
// )

const mountNode = document.getElementById('root')

// delete inlined CSS from SSR during DEVELOPMENT to get HMR work
let renderCallback = () => {
  if (process.env.NODE_ENV === 'development') {
    const node = document.getElementById('css')
    node.parentNode.removeChild(node)
    renderCallback = () => {}
  }
}

const renderApp = () => hydrate(ClientApp, mountNode, renderCallback)

window.main = () => preloadReady().then(renderApp)

registerServiceWorker()
