import { $autHost, $host } from './main'
export const createTypeInDb = async (type) => {
  const { data } = await $autHost.post('api/type', type)
  return data
}
export const fetchTypes = async () => {
  const { data } = await $host.get('api/type')
  return data
}

export const createBrand = async (brand) => {
  const { data } = await $autHost.post('api/brand', brand)
  return data
}
export const fetchBrands = async () => {
  const { data } = await $host.get('api/brand')
  return data
}

export const createDevice = async (device) => {
  const { data } = await $autHost.post('api/device', device)
  return data
}
export const fetchDevice = async (typeId, brandId, page, limit = 9) => {
  const { data } = await $host.get('api/device', {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  })
  return data
}
export const fetchOneDevice = async (id) => {
  const { data } = await $host.get('api/device/' + id)
  return data
}
export const updateOneDeviceR = async (id, rating) => {
  const { data } = await $autHost.patch(`api/device/patch/${id}/${rating}`)
  return data
}

export const deleteOneDevice = async (id) => {
  const { data } = await $host.delete('api/device/' + id)
  return data
}

export const createRating = async (rating) => {
  const { data } = await $autHost.post('api/rating', rating)
  return data
}

export const getRating = async (deviceId) => {
  const { data } = await $autHost.get('api/rating/' + deviceId)
  return data
}

export const createBasketDevice = async (device) => {
  const { data } = await $autHost.post('api/basketdevice', device)
  return data
}

export const fetchcBasketDevice = async () => {
  const { data } = await $autHost.get('api/basketdevice')
  return data
}
export const fetchcUserBasketDevice = async (basketId) => {
  const { data } = await $autHost.get('api/basketdevice/' + basketId)
  return data
}
export const deleteUserBasketDevice = async (id) => {
  if (id === undefined) {
    throw new Error('Invalid id parameter')
  }
  // console.log(body)
  const { data } = await $autHost.delete('api/basketdevice/delete/' + id)
  return data
}
