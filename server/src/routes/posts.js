var express = require("express");
var router = express.Router();
var posts = require("../services/posts");

/* router params */
router.param("slug", function(req, res, next, slug) {
  posts
    .getPost(slug)
    .then(function(post) {
      console.log("post ", post);
      req.post = post.items[0];
      next();
    })
    .catch(function(error) {
      console.error("ERROR OCCURED: ", error);
    });
});

router.use(function(req, res, next) {
  posts.getPosts().then(function(postCollection) {
    req.posts = postCollection.items;
    next();
  });
});

router.get("/featuredPost", function(req, res, next) {
  console.log("Featured post req res: ", req.posts);

  res.json({ post: req.post });
});

router.get("/post/:slug", function(req, res, next) {
  console.log("logging request", req);
  // res.render("post", {
  //   title: req.post.fields.postName,
  //   post: req.post.fieds.content
  // });
  res.json({ post: req.post });
});

router.get("/posts", function(req, res, next) {
  //   res.render('posts', {
  //     'title': 'posts',
  //     'posts': req.posts
  //   })
  res.json({ posts: req.posts });
});

router.get("/", function(req, res, next) {
  res.render("posts", {
    title: "posts",
    posts: req.posts
  });
});

module.exports = router;
