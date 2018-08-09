var client = require('./contentfulClient').client

function getPost (slug, query) {
  // little trick to get an entry with include
  // this way all linked items will be resolved for us
//   query = query || {}
//   query['content_type'] = '2PqfXUJwE8qSYKuM0U6w8M'
//   query['fields.slug'] = slug
  return client.getEntries(query)
}

function getPosts (query) {
//   query = query || {}
//   query.content_type = '2PqfXUJwE8qSYKuM0U6w8M'
  return client.getEntries(query)
}

function getPostsInCategory (id) {
  return getPosts({'fields.categories.sys.id[in]': id})
}
module.exports = {
  getPost,
  getPosts,
  getPostsInCategory
}
