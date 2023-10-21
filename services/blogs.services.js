const BlogsController = require('../controllers/blogs.controller')
const { saveImageInCubbit } = require('../helpers/saveImageInCubbit')
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

BlogServices.uploadImage = async (req, res) => {
  if (req.file) {
    const image = req.file
    const imageName = req.file.originalname
    const response = await saveImageInCubbit({ image, imageName })
    if (response.success) {
      res.status(201).json({ success: true, location: response.location })
    } else res.status(500).json({ error: 'Error al subir la imagen cubbit' })
  } else {
    res.status(500).json({ error: 'Error al cargar la imagen' })
  }
}

module.exports = BlogServices
