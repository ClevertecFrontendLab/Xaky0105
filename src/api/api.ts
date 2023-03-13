import axios from 'axios'

export enum ApiPath {
  categories = '/api/categories',
  books = '/api/books',
  registration = '/api/auth/local/register',
  auth = '/api/auth/local',
  forgotPass = '/api/auth/forgot-password',
  resetPass = '/api/auth/reset-password',
}

export const BASE_URL = 'https://strapi.cleverland.by'

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
})

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }

  return config
})
