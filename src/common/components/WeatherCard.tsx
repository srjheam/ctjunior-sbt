import { useEffect, useState } from "react"
import { Box, Grid, Text } from "@chakra-ui/react"
import TemperatureIndicator from "./TemperatureIndicator"
import TimeClock from "./TimeClock"
import WeathercodeIcon from "./WeathercodeIcon"
import { openMeteoApi } from "../../services/axios"
import { stringifyWeathercode } from "../helpers"
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

const WeatherCard = ({ location }: Props) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>()
  const [time, setTime] = useState(new Date(Date.now()))
  const [utcOffsetSeconds, setUtcOffsetSeconds] = useState(0)

  const weathercode = currentWeather?.weathercode ?? 0
  const temperature = currentWeather?.temperature ?? 0

  useEffect(() => {
    const timer = setInterval(() => (
      setTime(new Date())
    ), 1000)

    const getInfo = async () => {
      const result = await getWeatherCardInfo(location)
      setUtcOffsetSeconds(result.utcOffsetSeconds)
      setCurrentWeather(result.currentWeather)
    }
    getInfo()

    return () => clearInterval(timer); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid minH='96px' w='100%' borderRadius='10px' padding='12px' bg='#C4E1FE' gridAutoFlow='column' gridTemplateRows='auto auto auto'>
      <Text>{location.name}, {location.state}</Text>
      <TimeClock time={time} utcOffsetSeconds={utcOffsetSeconds} />
      <Text>{stringifyWeathercode(weathercode)}</Text>
      <Box margin='0 0 0 auto' gridRow='1 / -1'>
        <TemperatureIndicator temperature={temperature} />
        <WeathercodeIcon weathercode={weathercode} utcOffsetSeconds={utcOffsetSeconds} />
      </Box>
    </Grid>
  )
}

export default WeatherCard
