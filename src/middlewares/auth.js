import asyncHandler from 'express-async-handler'

import TokenHelper from '../utils/token'
import { ForbiddenError } from '../error'

export default {
  requiresLogin: asyncHandler(async (req, res, next) => {
    const bearerHeader = req.headers['authorization'] || req.headers['Authorization']
    if (typeof bearerHeader == 'undefined') {
      throw (new ForbiddenError('You must be logged in to view this.'))
    }
    const token = bearerHeader.slice(7)

    // Verified Token
    const verifiedUser = await TokenHelper.verifyAccessToken(token)
    const userData = await TokenHelper.getUserData(verifiedUser.id)
    req.user = userData
    next()
  })
}