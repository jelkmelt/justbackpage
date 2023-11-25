import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    number: {
      type: Number,
    },
    postType: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    section: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,

        ref: 'User'
    },
    country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      placed: { type: Boolean, default: false },
      preminum: { type: Boolean, default: false },
      highlighted: { type: Boolean, default: false },

    }
  ,
       { timestamps: true })

const Post = mongoose.model('Post', postSchema);
export default Post
