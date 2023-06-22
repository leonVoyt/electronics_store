const { Basket } = require('../models/models')
const ApiError = require('../error/apiError')

class BasketController {
  async getAll(req, res) {
    const baskets = await Basket.findAll()
    return res.json(baskets)
  }
  async getOne(req, res) {
    const { id } = req.params
    const basket = await Basket.findOne({ where: { id } })
    return res.json(basket)
  }
}

module.exports = new BasketController()
