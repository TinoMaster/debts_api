const BlogsController = require('../controllers/blogs.controller')
const { saveImageInCubbit } = require('../helpers/saveImageInCubbit')
const BlogServices = () => {}

BlogServices.getAllBlogs = async (req, res, next) => {
  BlogsController.getAllBlogs((err, docs) => {
    if (err) next(err)
    else {
      const filterDocs = docs.map((blog) => {
        const { _id, title, category, description, image, createdAt } = blog
        const date = new Date(createdAt)
        return { _id, title, category, description, image, date }
      })
      res.status(200).json({ success: true, data: filterDocs })
    }
  })
}

BlogServices.getBlogById = async (req, res, next) => {
  const { id } = req.params
  BlogsController.getBlogById(id, (err, docs) => {
    if (err) next(err)
    else res.status(200).json({ success: true, data: docs })
  })
}

BlogServices.getBlogByCategory = async (req, res, next) => {
  const { category } = req.params
  BlogsController.getBlogByCategory(category, (err, docs) => {
    if (err) next(err)
    else {
      const filterDocs = docs.map((blog) => {
        const { _id, title, category, description, image, createdAt } = blog
        const date = new Date(createdAt)
        return { _id, title, category, description, image, date }
      })
      res.status(200).json({ success: true, data: filterDocs })
    }
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
  console.log(req)
  console.log(req.file)
  if (req.file) {
    const image = req.file
    const imageName = req.file.originalname
    const response = await saveImageInCubbit({ image, imageName })
    console.log(response)
    if (response.success) {
      res.status(201).json({ success: true, location: response.location })
    } else res.json({ error: 'Error al subir la imagen cubbit' })
  } else {
    res.json({ error: 'Error al cargar la imagen' })
  }
}

BlogServices.deleteImage = async (req, res) => {}

module.exports = BlogServices
