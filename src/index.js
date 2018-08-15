import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <ApolloProvider>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </ApolloProvider>
, document.getElementById('root'));
registerServiceWorker();
