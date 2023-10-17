const BlogsController = require('../controllers/blogs.controller')
const BlogServices = () => {}

BlogServices.getAllBlogs = async (req, res, next) => {
  BlogsController.getAllBlogs((err, docs) => {
    if (err) next(err)
    else res.status(200).json({ success: true, data: docs })
  })
}

BlogServices.getBlogById = async (req, res, next) => {
  const { id } = req.params
  BlogsController.getBlogById(id, (err, docs) => {
    if (err) next(err)
    else res.status(200).json({ success: true, data: docs })
  })
}

BlogServices.createBlog = async (req, res) => {
  const data = req.body
  BlogsController.createBlog(data, (err, docs) => {
    if (err) {
      res.status(422).json({ error: true, message: 'Bad request' })
    } else res.status(200).json({ success: true, data: docs })
  })
}

BlogServices.updateBlog = async (req, res, next) => {
  const { id } = req.params
  const data = req.body
  BlogsController.updateBlog(id, data, (err, docs) => {
    if (err) next(err)
    else res.status(200).json({ success: true, data: docs })
  })
}

BlogServices.deleteBlog = async (req, res, next) => {
  const { id } = req.params
  BlogsController.deleteBlog(id, (err, docs) => {
    if (err) next(err)
    else res.status(200).json({ success: true, data: docs })
  })
}

module.exports = BlogServices
