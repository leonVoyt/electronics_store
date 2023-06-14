const uuid = require('uuid')
const path = require('path')
const { Device } = require('../models/models')
const ApiError = require('../error/apiError')

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body
      const { img } = req.files
      let fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      })

      return res.json(device)
    } catch (error) {
      next(ApiError.badRequest(req.body))
    }
  }
  async getAll(req, res) {
    const { brandId, typeId } = req.quary
  }
  async getOne(req, res) {}
}

module.exports = new DeviceController()
