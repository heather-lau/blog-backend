import mongoose from 'mongoose'

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
    required: [true, 'Password is required']
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

const User = mongoose.model('User', UserSchema)
export default User