const { BasketDevices } = require('../models/models')
const ApiError = require('../error/apiError')

class BasketDeviceController {
  async create(req, res) {
    const { basketId, deviceId } = req.body
    const baskets = await BasketDevices.create({ basketId, deviceId })
    return res.json(baskets)
  }

  async getThisAll(req, res) {
    const { basketId } = req.params
    const baskets = await BasketDevices.findAll({ where: { basketId } })
    return res.json(baskets)
  }
  async getAll(req, res) {
    const basket = await BasketDevices.findAll()
    return res.json(basket)
  }
  async deleteOne(req, res, next) {
    try {
      const { id } = req.params
      const basket = await BasketDevices.destroy({ where: { id } })
      return res.json(basket)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new BasketDeviceController()
