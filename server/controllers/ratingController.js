const { Rating } = require('../models/models')
const ApiError = require('../error/apiError')

class RatibgController {
  async create(req, res) {
    const { name, userId, deviceId } = req.body
    const rating = await Rating.create({ name, userId, deviceId })
    return res.json(rating)
  }
  async getAll(req, res) {
    const rating = await Rating.findAll()
    return res.json(rating)
  }
  async getFilter(req, res) {
    const { deviceId } = req.params
    const rating = await Rating.findAll({ where: { deviceId } })
    return res.json(rating)
  }
}

module.exports = new RatibgController()
