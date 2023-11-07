const BlogModel = require('../models/blog.model')
const BlogsController = () => {}

BlogsController.getAllBlogs = async (cb) => {
  try {
    const blogs = await BlogModel.find()
    const filterBlogs = blogs.map((blog) => {
      delete blog.sections
      return blog
    })
    cb(null, filterBlogs)
  } catch (error) {
    cb(error, null)
  }
}

BlogsController.getBlogById = async (id, cb) => {
  try {
    const blog = await BlogModel.findById(id)
    cb(null, blog)
  } catch (error) {
    cb(error, null)
  }
}

BlogsController.createBlog = async (blog, cb) => {
  try {
    const newBlog = await BlogModel.create(blog)
    cb(null, newBlog)
  } catch (error) {
    console.log(error)
    cb(error, null)
  }
}

BlogsController.getBlogByCategory = async (category, cb) => {
  try {
    const blogs = await BlogModel.find({ category })
    const filterBlogs = blogs.map((blog) => {
      delete blog.sections
      return blog
    })
    cb(null, filterBlogs)
  } catch (error) {
    cb(error, null)
  }
}

BlogsController.updateBlog = async (id, blog, cb) => {
  try {
    const updatedBlog = await BlogModel.findOneAndUpdate({ _id: id }, blog, { new: true })
    cb(null, updatedBlog)
  } catch (error) {
    cb(error, null)
  }
}

BlogsController.deleteBlog = async (id, cb) => {
  try {
    const deletedBlog = await BlogModel.findOneAndDelete({ _id: id })
    cb(null, deletedBlog)
  } catch (error) {
    cb(error, null)
  }
}

module.exports = BlogsController
