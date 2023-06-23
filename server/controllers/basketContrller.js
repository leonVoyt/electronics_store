const { Basket } = require('../models/models')
const ApiError = require('../error/apiError')

class BasketController {
  async getAll(req, res, next) {
    try {
      const baskets = await Basket.findAll()
      return res.json(baskets)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params
      const basket = await Basket.findOne({ where: { id } })
      return res.json(basket)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new BasketController()
