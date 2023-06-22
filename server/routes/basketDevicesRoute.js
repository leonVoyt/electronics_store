const Router = require('express')
const router = new Router()
const BasketDeviceController = require('../controllers/basketDevicesController')

router.get('/:basketId', BasketDeviceController.getThisAll)
router.post('/', BasketDeviceController.create)
router.get('/', BasketDeviceController.getAll)
router.delete('/delete/:id', BasketDeviceController.deleteOne)

module.exports = router
