import { Box, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { openMeteoApi } from "../../services/axios"
import { stringifyWeathercode } from "../helpers"
import WeathercodeIcon from "./WeathercodeIcon"
import type { Location, CurrentWeather } from "../types"

interface Props {
  location: Location
}

interface WeatherCardInfo {
  utcOffsetSeconds: number
  currentWeather: CurrentWeather
}

const getWeatherCardInfo = async (location: Location): Promise<WeatherCardInfo> =>
  await openMeteoApi.get('?', {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      current_weather: true,
      timezone: location.timezone
    }
  })
  .then(response =>
    response.data
  )
  .then(data => {
    const transformed:WeatherCardInfo = data
    transformed.utcOffsetSeconds = data.utc_offset_seconds
    transformed.currentWeather = data.current_weather
    return transformed
  })

const getCardTime = (utcOffsetSeconds: number): Date =>
  new Date(Date.now() + + utcOffsetSeconds * 1000)

const WeatherCard = ({ location }: Props) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>()
  const [time, setTime] = useState(getCardTime(0))

  const weathercode = currentWeather?.weathercode ?? 0
  const isNight = time.getUTCHours() < 6 || time.getUTCHours() > 18

  useEffect(() => {
    let timer:NodeJS.Timer

    const getInfo = async () => {
      const result = await getWeatherCardInfo(location)
      setCurrentWeather(result.currentWeather)
      timer = setInterval(() =>
        setTime(getCardTime(result.utcOffsetSeconds)
      ), 1000);
    }
    getInfo()

    return () => clearInterval(timer); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box h='96px' w='100%' borderRadius='10px' padding='12px' bg='#C4E1FE'>
      <Text>{location.name}, {location.state}</Text>
      <Text>{String(time.getUTCHours() % 24).padStart(2, '0')}:{String(time.getUTCMinutes() % 60).padStart(2, '0')}</Text>
      <Text>{stringifyWeathercode(weathercode)}</Text>
      <Text>{currentWeather?.temperature}</Text>
      <WeathercodeIcon weathercode={weathercode} isNight={isNight} />
    </Box>
  )
}

export default WeatherCard
