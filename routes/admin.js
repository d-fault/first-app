var express = require('express')
var router = express.Router()
var User = require('../models/userschema')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'death star control pannel' })
})

/* GET users listing. */
router.post('/users', function (req, res, next) {
  res.render('users', {title: 'USER ACCOUNTS'})
})

router.get('/users/test', function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) throw err
    // object of all the users
    // console.log(users)
    res.json(users)
  })
})

module.exports = router
