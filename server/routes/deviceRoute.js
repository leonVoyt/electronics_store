const Router = require('express')
const router = new Router()
const DeviceController = require('../controllers/deviceController')

router.post('/', DeviceController.create)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)
router.delete('/:id', DeviceController.deleteOne)
router.patch('/patch/:id/:rating', DeviceController.updateOne)

module.exports = router
