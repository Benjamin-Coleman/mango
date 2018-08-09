var express = require('express')
var router = express.Router()
var posts = require('../services/posts')

/* router params */
router.param('slug', function (req, res, next, slug) {
  posts.getPost(slug).then(function (post) {
    req.post = post.items[0]
    next()
  })
})

router.use(function (req, res, next) {
  posts.getPosts().then(function (postCollection) {
    req.posts = postCollection.items
    next()
  })
})

router.get('/posts/:slug', function (req, res, next) {
  res.render('post', {title: req.post.fields.postName, post: req.post})
})

router.get('/posts', function (req, res, next) {
    console.log('Router /posts', req.posts)
//   res.render('posts', {
//     'title': 'posts',
//     'posts': req.posts
//   })
  res.json({posts: req.posts})
  
})

router.get('/', function (req, res, next) {
  res.render('posts', {
    'title': 'posts',
    'posts': req.posts
  })
})

module.exports = router
