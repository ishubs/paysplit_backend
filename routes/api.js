var express = require('express')
var router = express.Router()
const controller = require("./../controller/controller")

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Origin', '*'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Accept',
  )
  next()
})




router.post("/selectcontacts", controller.selectcontacts);
router.post("/contactsync", controller.contactsync);



module.exports = router;