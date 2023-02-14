import axios from 'axios'

export enum ApiPath {
  categories = '/api/categories',
  books = '/api/books',
}

export const BASE_URL = 'https://strapi.cleverland.by'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
})
