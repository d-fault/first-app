var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var admin = require('./routes/admin')
var app = express()
var mongoose = require('mongoose')
var User = require('./models/userschema')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', admin)

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
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/myappdatabase'
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err)
  } else {
    console.log('Succeeded connected to: ' + uristring)
  }
})

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
  email: 'example@mail.org'
})

// call the built-in save method to save to the database
player.save(function (err) {
  if (err) throw err
  console.log('User saved successfully!')
})

// get all the users
User.find({}, function (err, users) {
  if (err) throw err
  // object of all the users
  console.log(users)
})

// it works=)
module.exports = app
