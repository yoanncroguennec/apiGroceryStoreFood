const router = require('express').Router()
const authCtrl = require('../controllers/AuthCtrl')

router.post("/register", authCtrl.register)
router.post("/loginClient", authCtrl.loginClient)
router.post("/loginAdmin", authCtrl.loginAdmin)

module.exports = router