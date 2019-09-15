import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import User from '../models/user'
import { AuthenticationError } from '../error'
import CONFIG from '../config/config'

export default {
  // Signing JWT access token
  createAccessToken: asyncHandler(async (user) => {
    // Create payload
    let payload = {
      id: user._id,
      name: user.name
    }

    const token = await jwt.sign(payload, CONFIG.jwt_secret, {expiresIn: '12h'})
    return token
  }),

  verifyAccessToken: asyncHandler(async (token) => {
    const verifiedToken = await jwt.verify(token, CONFIG.jwt_secret)
    if (!verifiedToken) {
      throw (new AuthenticationError('Invaild token'))
    }
    return verifiedToken
  }),

  getUserData: asyncHandler(async (id) => {
    const user = await User.findById(id)
    if (!user) {
      throw (new AuthenticationError('Invaild user'))
    }
    let payload = {
      id: user._id,
      username: user.username
    }
    return payload
  })
}