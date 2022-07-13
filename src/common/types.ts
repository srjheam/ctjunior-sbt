import { Dispatch, SetStateAction } from 'react'

export type Dispatcher<S> = Dispatch<SetStateAction<S>>;
export interface Location {
  id: number
  latitude: number
  longitude: number
  name: string
  state: string // equivalent to admin1 in geocoding api
  country: string
  timezone: string
}

export interface CurrentWeather {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  time: Date
}
