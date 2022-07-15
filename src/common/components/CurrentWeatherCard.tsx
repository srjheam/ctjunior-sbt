import { useEffect, useState } from 'react'
import { Box, Center, Flex, HStack, Icon, Spacer, Text } from '@chakra-ui/react'
import { MdOutlinePlace, MdOutlineWaterDrop } from 'react-icons/md'
import MaxMinTemperature from './MinMaxTemperature'
import TemperatureIndicator from './TemperatureIndicator'
import TimeClock from './TimeClock'
import WeathercodeIcon from './WeathercodeIcon'
import { getLocalizedDate, stringifyWeathercode } from '../helpers'
import { openMeteoApi } from '../../services/axios'
import type { Location, CurrentWeather } from '../types'

interface CurrentWeatherCardData {
  utcOffsetSeconds: number
  currentPrecipitationSum: number
  currentWeather: CurrentWeather
  maxTemperatureToday: number
  minTemperatureToday: number
}

const getCurrentWeather = async (location: Location) => 
  await openMeteoApi.get('?', {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      hourly: ['precipitation'],
      daily: ['temperature_2m_max', 'temperature_2m_min'],
      current_weather: true,
      timezone: location.timezone
    }
  })
  .then(response =>
    response.data
  )
  .then(data => {
    const hourlyPrecipitations: number[] = data.hourly.precipitation
    const currPrecipitationIndex: number = data.hourly.time.map((x: string) => new Date(x)).findIndex((x: Date) => x.getUTCHours() > getLocalizedDate(data.utc_offset_seconds).getUTCHours())

    const currentPrecipitationSum = hourlyPrecipitations[currPrecipitationIndex]
    const maxTemperatureToday = data.daily.temperature_2m_max[0];
    const minTemperatureToday = data.daily.temperature_2m_min[0];
    
    return {
      utcOffsetSeconds: data.utc_offset_seconds,
      currentPrecipitationSum: currentPrecipitationSum,
      currentWeather: data.current_weather,
      maxTemperatureToday: maxTemperatureToday,
      minTemperatureToday: minTemperatureToday
    } as CurrentWeatherCardData
  })
  .then(data => {
    data.currentWeather.time = new Date(data.currentWeather.time)
    return data
  })
  
const CurrentWeatherCard = ({ location }: { location: Location }) => {
  const [info, setInfo] = useState<CurrentWeatherCardData>()

  const utcOffsetSeconds = info?.utcOffsetSeconds ?? 0
  const temperature = info?.currentWeather.temperature ?? 0
  const weathercode = info?.currentWeather.weathercode ?? 0
  const currentPrecipitationSum = info?.currentPrecipitationSum ?? 0
  const maxTemperatureToday = info?.maxTemperatureToday ?? 0;
  const minTemperatureToday = info?.minTemperatureToday ?? 0;
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrentWeather(location)
      setInfo(data)
    }

    fetchData() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display='inline-block' w='100%' h='64vh' margin='24px auto 0' padding='12px 16px' borderRadius='10px' bg='#C4E1FE'>
      <Flex direction='column' height='100%'>
        <Center>
          <HStack spacing='8px'>
            <Icon as={MdOutlinePlace} />
            <Text>{location.name}, {location.state}</Text>
          </HStack>
          <Spacer />
          <TimeClock utcOffsetSeconds={utcOffsetSeconds} />
        </Center>
        <Center flexGrow={1} flexDirection='column' rowGap='16px' style={{}}>
          <HStack spacing='16px'>
            <TemperatureIndicator temperature={temperature} />
            <WeathercodeIcon weathercode={weathercode} utcOffsetSeconds={utcOffsetSeconds}  />
          </HStack>
          <Text>{stringifyWeathercode(weathercode)}</Text>
        </Center>
        <Center>
          <HStack spacing='4px'>
            <Icon as={MdOutlineWaterDrop} />
            <Text>{currentPrecipitationSum} mm</Text>
          </HStack>
          <Spacer />
          <MaxMinTemperature max={maxTemperatureToday} min={minTemperatureToday} />
        </Center>
      </Flex>
    </Box>
  )
}

export default CurrentWeatherCard
