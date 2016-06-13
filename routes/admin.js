let express = require('express')
let router = express.Router()
let User = require('../models/userschema')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'death star control pannel' })
})

/* GET users listing. */
router.post('/users', function (req, res, next) {
  res.render('users', {title: 'USER ACCOUNTS'})
})
// JSON output in some page
router.get('/users/test', function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) throw err
    // object of all the users
    res.json(users)
  })
})

router.post('/users/adduser', function (req, res, next) {
  User.insert({}, function (err, users) {
    if (err) throw err
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    )
  })
})

module.exports = router
