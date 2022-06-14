const router = require('express').Router()
const userCtrl = require('../controllers/UserCtrl')

router.get("/", userCtrl.getAllUsers);

router.route("/:id")
    .put(userCtrl.updateUser)
    .delete(userCtrl.deleteUser)
    .get(userCtrl.getUser)

module.exports = router