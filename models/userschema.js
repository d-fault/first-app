let mongoose = require('mongoose')
let Schema = mongoose.Schema

// create a schema
let userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {type: String, required: true},
  location: String,
  age: Number
})

// the schema is useless so far
// we need to create a model using it
let User = mongoose.model('User', userSchema)

// make this available to our users in our Node applications
module.exports = User
