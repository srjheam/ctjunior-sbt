import { useEffect, useState } from "react"
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/react"
import { openMeteoApi } from "../../services/axios"
import type { Location } from "../types"
import WeathercodeIcon from "./WeathercodeIcon"

interface HourlyData {
  utcOffsetSeconds: number
  time: Date[]
  temperature: number[]
  weathercode: number[]
}

const getHourlyWeatherData = async (location: Location) =>
  await openMeteoApi.get('?', {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone,
      hourly: ['temperature_2m', 'weathercode']
    }
  })
  .then(response => {
    response.data.hourly.utcOffsetSeconds = response.data.utc_offset_seconds
    return response.data.hourly
  })
  .then(hourly => {
    hourly.temperature = hourly.temperature_2m
    hourly.time = hourly.time.map((x: string) => new Date(x))
    return hourly as HourlyData
  })
  
const getHoursNow = (utcOffsetSeconds: number) =>
  (new Date(Date.now() + utcOffsetSeconds * 1000)).getUTCHours()

const getDateNow = (utcOffsetSeconds: number) =>
  (new Date(Date.now() + utcOffsetSeconds * 1000)).getUTCDate()

const HourlyWeather = ({ location }: { location: Location }) => {
  const [info, setInfo] = useState<HourlyData>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHourlyWeatherData(location)

      // remove all hourly forecast data before current time in Location AND after 6am next day
      const start = data.time.findIndex(x => x.getHours() === getHoursNow(data.utcOffsetSeconds))
      const end = data.time.findIndex(x => x.getDate() !== getDateNow(data.utcOffsetSeconds) && x.getHours() > 6)
      data.time = data.time.slice(start, end)
      data.temperature = data.temperature.slice(start, end)
      data.weathercode = data.weathercode.slice(start, end)

      setInfo(data)
    }

    fetchData() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HStack spacing='16px' overflow='auto' padding='0 0 8px'>
      {info?.time.map((x, i) =>
        <Center key={x.getTime()} flexDirection='column' gap='8px'>
          <Text>{Math.round(info?.temperature[i])}º</Text>
          <WeathercodeIcon weathercode={info?.weathercode[i]} isNight={x.getHours() < 6 || x.getHours() >= 18} />
          <Text>{String(x.getHours() % 24).padStart(2, '0')}:{String(x.getMinutes() % 60).padStart(2, '0')}</Text>
        </Center>
      )}
    </HStack>
  )
}

export default HourlyWeather
