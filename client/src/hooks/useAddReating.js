import { createRating } from '../http/deviceAPI'

export function useAddRating(userId, deviceId) {
  const formData = new FormData()
  formData.append('name', '3')
  formData.append('userId', `${userId}`)
  formData.append('deviceId', `${deviceId}`)

  createRating(formData)
}
