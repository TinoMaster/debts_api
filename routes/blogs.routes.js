const BlogServices = require('../services/blogs.services')
const router = require('express').Router()

router.get('/blogs', BlogServices.getAllBlogs)
router.get('/blogs/:id', BlogServices.getBlogById)
router.post('/blogs', BlogServices.createBlog)
router.delete('/blogs/:id', BlogServices.deleteBlog)
router.put('/blogs/:id', BlogServices.updateBlog)

module.exports = router
