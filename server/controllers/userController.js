const { User, Basket } = require('../models/models')
const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  })
}
class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body
    if (!email || !password) {
      return next(ApiError.badRequest('uncorrect email or password'))
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return next(ApiError.badRequest('user with this email already exist'))
    }
    const hashPassord = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashPassord })
    const basket = await Basket.create({ userId: user.id })
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token })
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return next(ApiError.badRequest('user dont exist'))
    }
    let comprarePassword = bcrypt.compareSync(password, user.password)
    if (!comprarePassword) {
      return next(ApiError.badRequest('wrong password'))
    }
    const token = generateJwt(user.id, user.email, user.role)

    return res.json({ token })
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    res.json({ token })
  }

  async deleteOne(req, res) {
    const { email } = req.body
    const user = await User.destroy({ where: { email } })
    res.json(user)
  }

  async getUser(req, res, next) {
    const { email } = req.params
    let user = await User.findOne({ where: { email } })
    return res.json(user)
  }
}

module.exports = new UserController()
