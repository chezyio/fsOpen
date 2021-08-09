const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const middleware = require("../utils/middleware");


blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user')
    res.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {

    const body = req.body
    const user = req.user

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: "token missing or invalid" });
    }


    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id


    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog)
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

blogsRouter.delete("/:id", middleware.userExtractor, async (req, res) => {

    const blog = await Blog.findById(req.params.id)
    const user = req.user


    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }


    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } else {

        return res.status(401).json({
            error: 'Unauthorized to access the blog'
        })

    }



});


module.exports = blogsRouter

