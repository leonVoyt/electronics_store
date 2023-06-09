const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
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

      if (info) {
        info = JSON.parse(info)
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        )
      }
      return res.json(device)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async getAll(req, res) {
    const { id } = req.params

    let { brandId, typeId, limit, page } = req.query
    page = page || 1
    limit = limit || 8
    let offset = page * limit - limit
    let devices
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
        order: [['id', 'DESC']],
      })
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
        order: [['id', 'DESC']],
      })
    }
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({
        limit,
        offset,
        order: [['id', 'DESC']],
      })
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
        order: [['id', 'DESC']],
      })
    }
    return res.json(devices)
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: 'info' }],
      })
      return res.json(device)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async deleteOne(req, res) {
    try {
      const { id } = req.params
      const device = await Device.destroy({ where: { id } })
      return res.json(device)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async updateOne(req, res, next) {
    try {
      const { id, rating } = req.params

      const device = await Device.update(
        {
          rating: rating,
        },
        {
          where: {
            id: id,
          },
        }
      )
      return res.json(device)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new DeviceController()
