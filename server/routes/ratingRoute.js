const Router = require('express')
const router = new Router()
const RatibgController = require('../controllers/ratingController')

router.post('/', RatibgController.create)
router.get('/', RatibgController.getAll)
router.get('/:deviceId', RatibgController.getFilter)

module.exports = router
