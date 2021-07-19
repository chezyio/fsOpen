const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB')
}).catch(err => {
  console.log(`Error: ${err}`)
})


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: 3
  },
  number: {
    type: String,
    match: /^\d{8}$/g,
  },
})

personSchema.plugin(uniqueValidator)


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Persons', personSchema)
