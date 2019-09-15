import mongoose, { mongo } from 'mongoose'

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

const Article = mongoose.model('Article', ArticleSchema)

export default Article
