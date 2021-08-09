const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide a username'],
        minLength: [3, 'username is too short'],
    },
    name: String,
    passwordHash: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [3, 'password is too short']
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

userSchema.plugin(uniqueValidator)


module.exports = mongoose.model('User', userSchema)
