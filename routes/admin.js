var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/admin', function (req, res, next) {
  res.render('index', { title: 'death star control pannel' })
})

/* GET users listing. */
router.post('/admin/users', function (req, res, next) {
  res.render('users', {title: 'USER ACCOUNTS'})
})

module.exports = router
