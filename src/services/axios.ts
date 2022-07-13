import axios from 'axios';

export const openMeteoApi = axios.create({
    baseURL: 'https://api.open-meteo.com/v1/forecast'
})

export const geocodingApi = axios.create({
    baseURL: 'https://geocoding-api.open-meteo.com/v1/search'
})
