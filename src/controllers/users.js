import asyncHandler from 'express-async-handler'

import User from '../models/user'
import TokenHelper from '../utils/token'
import { BadRequestError, AuthenticationError } from '../error'

export default {
  // User signup
  signup: asyncHandler(async (req, res, next) => {
    const { username, name, password } = req.body
    if (!username || !name || !password) {
      next(new BadRequestError('Name is required'))
    }
    const createdUser = await User.create(req.body)
    res.formatSend(createdUser)
  }),

  // User signin
  signin: asyncHandler(async (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      next(new BadRequestError('Username and password are required'))
    }

    const user = await User.authenticate(username, password)
    if (!user) {
      next(new AuthenticationError('Invalid username or password'))
    }

    // Signing JWT access token
    const accessToken = await TokenHelper.createAccessToken(user)

    res.formatSend({accessToken})
  })
}