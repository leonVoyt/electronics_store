const Router = require('express')
const router = new Router()
const RatibgController = require('../controllers/ratingController')

router.post('/', RatibgController.create)
router.get('/', RatibgController.getAll)

module.exports = router
