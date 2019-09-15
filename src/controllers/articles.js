import AsyncHandler from 'express-async-handler'
import { Types as mongooseTypes } from 'mongoose'

import Article from '../models/article'
import { BadRequestError, ResourceNotFoundError } from '../error'

export default {
  // Display list of all articles
  list: AsyncHandler(async (req, res, next) => {
    const articleList = await Article.find({})

    res.formatSend(articleList)
  }),

  // Display details of an article
  details: AsyncHandler(async (req, res, next) => {
    const { id } = req.params

    // Validate id 
    const validId = mongooseTypes.ObjectId.isValid(id)
    if (!validId) {
      throw next(new ResourceNotFoundError())
    }

    // Find the article
    const articleDetails = await Article.findById(id)

    res.formatSend(articleDetails)
  }),

  // Handle create article form by POST
  create: AsyncHandler(async (req, res, next) => {
    // Check required fields
    const { title, content } = req.body
    if (!title || !content) {
      throw next(new BadRequestError())
    }

    // Create an article
    const createdArticle = await Article.create(req.body)

    res.formatSend(createdArticle)
  }),

  // Handle update article form by PUT
  update: AsyncHandler(async (req, res, next) => {
    const { id } = req.params

    // Validate id 
    const validId = mongooseTypes.ObjectId.isValid(id)
    if (!validId) {
      throw next(new ResourceNotFoundError())
    }

    // Check required fields
    const { title, content } = req.body
    if (!title || !content) {
      throw next(new BadRequestError())
    }

    // Update an article
    const updatedArticle = await Article.findByIdAndUpdate(id, req.body)

    res.formatSend(updatedArticle)
  }),

  // Handle delete article form by DELTE
  delete: AsyncHandler(async (req, res, next) => {
    const { id } = req.params

    // Validate id 
    const validId = mongooseTypes.ObjectId.isValid(id)
    if (!validId) {
      throw next(new ResourceNotFoundError())
    }

    // Delete a article
    const deletedArticle = await Article.findByIdAndDelete(id)

    res.formatSend({})
  })
}