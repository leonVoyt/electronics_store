const Router = require('express')
const router = new Router()
const userRouter = require('../controllers/userController')
const userControlle = require('../controllers/userController')

router.post('/registration', userRouter.registration)
router.post('/login', userRouter.login)
router.get('/auth', userControlle.check)

module.exports = router
