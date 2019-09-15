import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import { AuthenticationError } from '../error'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is requeired']
  }, 
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function(v) {
        return v && v.length >= 6
      },
      message: "Password must be at least 6 characters"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
})

// Hash user password before saved to database
UserSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (err) {
    return next(err)
  }
})

UserSchema.statics = {
  async authenticate(username, password) {
    try {
      const user = await this.findOne({username}).populate('role')
      if (!user) {
        throw (new AuthenticationError('User not found'))
      }
      const authenticated = await bcrypt.compare(password, user.password)
      if (!authenticated) {
        throw (new AuthenticationError('Invalid username or password'))
      }
      return user
    } catch(err) {
      throw (err)
    }
  }
}

const User = mongoose.model('User', UserSchema)
export default User