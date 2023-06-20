const Router = require('express')
const router = new Router()
const userRouter = require('../controllers/userController')
const userControlle = require('../controllers/userController')
const authMidleware = require('../midlware/authMidlware')

router.post('/registration', userRouter.registration)
router.post('/login', userRouter.login)
router.get('/auth', authMidleware, userControlle.check)
router.get('/getuser/:email', userControlle.getUser)
router.delete('/delete', userControlle.deleteOne)

module.exports = router
