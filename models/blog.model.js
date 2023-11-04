const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dbConfig = require('../configs/db_mongo')

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    content: String,
    image: String,
    sections: [
      {
        id: Number,
        title: String,
        type: {
          type: String,
          validate: {
            validator: function (value) {
              return ['code', 'image', 'text', 'markdown']
            },
            message: 'Valor del type no valido'
          }
        },
        content: String
      }
    ]
  },
  {
    timestamps: true
  }
)

const BlogModel = mongoose.model('Blogs', BlogSchema)
mongoose.connect(`${dbConfig.mongoHost}/${dbConfig.mongoDb}`)

module.exports = BlogModel
