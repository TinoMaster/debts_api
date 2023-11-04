const { upload } = require('../helpers/uploadImage')
const BlogServices = require('../services/blogs.services')
const router = require('express').Router()

router.get('/blogs', BlogServices.getAllBlogs)
router.get('/blogs/:id', BlogServices.getBlogById)
router.get('/blogs/category/:category', BlogServices.getBlogByCategory)
router.post('/blogs', BlogServices.createBlog)
router.delete('/blogs/:id', BlogServices.deleteBlog)
router.put('/blogs/:id', BlogServices.updateBlog)
/* Subida de imagenes con s3client y cubbit */
router.post('/blogs/image', upload.single('image'), BlogServices.uploadImage)

module.exports = router
