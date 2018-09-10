import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter, matchPath } from 'react-router-dom'
import configureStore from '../../src/store'
import App from '../../src/App'
import indexController from './controllers/index'
import Loadable from 'react-loadable'
var dotenv = require('dotenv').config()
var express = require('express')
var path = require('path')
var cors = require('cors')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var compression = require('compression')
var helmet = require('helmet')
const { ApolloServer, gql } = require('apollo-server-express')
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
var resolvers = require('./resolvers')
var posts = require('./routes/posts')
var graphql = require('./routes/graphql')

var app = express()

app.use(indexController)

// TODO
// convert this to bin/www with error handling
const PORT = 3000

Loadable.preloadAll().then(() => {
  app.listen(PORT, error => {
    if (error) {
      return console.log('something bad happened', error)
    }

    console.log('listening on ' + PORT + '...')
  })
})

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
// app.set("view cache", true);
app.use(helmet()) // protect from well known vulnerabilities
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())
app.use(express.static(path.join(__dirname, 'build')))

app.use(cors())

app.use('/', posts)
// app.use('/products', products)
// app.use('/categories', categories)
// app.use('/brand', brands)
app.use('/posts', posts)
// app.use("/graphql", graphql);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// Provide resolver functions for your schema fields
// const resolvers = {
//   Query: query,
//   Mutation: auth
// };

// const server = new ApolloServer({ typeDefs, resolvers });
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
      debug: true,
      secret: process.env.PRISMA_SECRET
    })
  })
})
server.start(() =>
  console.log(`🚀 GraphQL server is running on http://localhost:4000`)
)

// server.applyMiddleware({ app });

// app.listen({ port: 4000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
// );

// app.get('*', (req, res) => {
//   res.sendFile(__dirname + 'build/index.html')
// })

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(logger('dev'))
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    // res.render("error", {
    //   message: err.message,
    //   error: err
    // });
    console.error(err)
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  // res.render("error", {
  //   message: err.message,
  //   error: {}
  // });
  console.error(err)
})

module.exports = app
