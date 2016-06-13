var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var admin = require('./routes/admin')
var app = express()
var mybase = 'mongodb://localhost/myappdatabase'
var mongoose = require('mongoose')
// var User = require('./models/userschema')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', admin) // get the app router
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
};

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
mongoose.connect(mybase, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + mybase + '. ' + err)
  } else {
    console.log('connected to: ' + mybase)
  }
})
/*
// get the user player
User.find({ username: 'player' }, function (err, user) {
  if (err) throw err
  // delete him
  User.remove(function (err) {
    if (err) throw err
    console.log('User successfully deleted!')
  })
})

// create a new user called player
var player = new User({
  name: 'anon',
  username: 'player',
  password: 'qwerty',
  email: 'example@mail.org',
  age: '29',
  location: 'Helsinki'
})

// call the built-in save method to save to the database
player.save(function (err) {
  if (err) throw err
  console.log('User saved successfully!')
})
*/
module.exports = app
