import { $autHost, $host } from './main'
import jwt_decode from 'jwt-decode'
export const registration = async (email, password) => {
  const { data } = await $host.post('api/user/registration', {
    email,
    password,
    role: 'ADMIN',
  })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', {
    email,
    password,
  })

  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
export const check = async () => {
  try {
    const { data } = await $autHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
  } catch (error) {
    console.log(error)
  }
}
export const getUser = async (email) => {
  const user = await $autHost.get('api/user/getuser/' + email)
  // localStorage.setItem('token', data.token)
  return user
}
