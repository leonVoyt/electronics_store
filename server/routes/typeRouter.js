const Router = require('express')
const router = new Router()
const TypeController = require('../controllers/typeController')
const checkRole = require('../midlware/checkRole.midleWare')
router.post('/', checkRole('ADMIN'), TypeController.create)
router.get('/', TypeController.getAll)

module.exports = router
