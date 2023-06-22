const Router = require('express')
const router = new Router()
const BasketController = require('../controllers/basketContrller')

router.get('/:id', BasketController.getOne)
router.get('/', BasketController.getAll)

module.exports = router
