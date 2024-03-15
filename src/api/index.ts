import axios from 'axios'
import { IWeatherData } from './types'

const weatherKey = process.env.EXPO_PUBLIC_API_KEY
const fetcher = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

export const weatherAPI = {
  getCurrentWeatherForLocation: async (url: string) => {
    const resp = await fetcher.get<IWeatherData>(url + `&appid=${weatherKey}`)
    return resp.data
  },
}
