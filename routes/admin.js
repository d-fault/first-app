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
/*
 * POST to adduser.
 */
router.post('/adduser', function (req, res) {
  var db = req.db
  var collection = db.get('userlist')
  collection.insert(req.body, function (err, result) {
    res.send(
            (err === null) ? { msg: '' } : { msg: err }
        )
  })
})

module.exports = router
