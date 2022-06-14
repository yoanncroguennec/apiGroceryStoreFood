const router = require('express').Router()
const productCtrl = require('../controllers/ProductCtrl')


router.route('/')
    .post(productCtrl.createProduct)
    .get(productCtrl.getAllProducts)

router.route('/:id')
    .put(productCtrl.updateProduct)
    .delete(productCtrl.deleteProduct)

router.get('/find/:id', productCtrl.getProduct)
router.get('/countByType', productCtrl.countByType)

module.exports = router