const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRoute')
const brandRouter = require('./brandRoute')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const ratingRoute = require('./ratingRoute')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter)
router.use('/brand', brandRouter)
router.use('/rating', ratingRoute)

module.exports = router
