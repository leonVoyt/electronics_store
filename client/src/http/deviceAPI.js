import { $autHost, $host } from './main'
export const createType = async (type) => {
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
export const fetchDevice = async () => {
  const { data } = await $host.get('api/device ')
  return data
}
export const fetchOneDevice = async (id) => {
  const { data } = await $host.get('api/device/' + id)
  return data
}
