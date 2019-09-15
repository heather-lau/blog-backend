import asyncHandler from 'express-async-handler'

import User from '../models/user'
import { BadRequestError } from '../error'

export default{
  // Display list of all users
  list: asyncHandler(async (req, res, next) => {
    const userList = await User.find({})
    res.formatSend(userList)
  }),

  // Create user
  create: asyncHandler(async (req, res, next) => {
    const { name } = req.body
    if (!name) {
      throw next(new BadRequestError('Name is required'))
    }
    const createdUser = await User.create(req.body)
    res.formatSend(createdUser)
  })
}