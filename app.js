var express = require('express')
var path = require('path')
var cors = require('cors')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var compression = require('compression')
var helmet = require('helmet')
const { ApolloServer, gql } = require('apollo-server-express');
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
var query = require('./resolvers/Query/query')
var mutation = require('./resolvers/Mutation/mutation')
var products = require('./routes/products')
var categories = require('./routes/categories')
var brands = require('./routes/brands')
var posts = require('./routes/posts')
var graphql = require('./routes/graphql')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.set('view cache', true)
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
// app.use('/graphql', graphql)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: query,
  Mutation: mutation
};

// const server = new ApolloServer({ typeDefs, resolvers });
const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: './generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
    }),
  }),
})
server.start(() => console.log(`🚀 GraphQL server is running on http://localhost:4000`))

// server.applyMiddleware({ app });

// app.listen({ port: 4000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
// );

app.get("*", (req, res) => {
  res.sendFile(__direname + 'build/index.html')
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(logger('dev'))
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
