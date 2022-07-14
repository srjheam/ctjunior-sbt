import { Box } from "@chakra-ui/react"
import useLocalStorageState from "use-local-storage-state";
import Card from "./Card";
import HourlyWeather from "./HourlyWeather";
import { SELECTED_LOCATION_LOCAL_STORAGE_KEY } from '../constants';
import type { Location } from '../types'

function getFallbackLocation(): Location {
  return {
    id: 3444924,
    latitude: -20.31944,
    longitude: -40.33778,
    name: "Vitória",
    country: "Brasil",
    state: "Espírito Santo",
    timezone: "America/Sao_Paulo"
  }
}

const WeatherForecastHome = () => {
  const [location, setLocation] = useLocalStorageState<Location>(SELECTED_LOCATION_LOCAL_STORAGE_KEY, {
    defaultValue: getFallbackLocation()
  })

  return (
    <Box style={{ columns: '3 372px', columnGap: '24px' }} margin='32px 0 24px'>
      <Box className='mock' display='inline-block' w='100%' margin='24px auto 0' padding='12px' borderRadius='10px' height='60vh' bg='#F2F2F7' />
      <Card>
        <HourlyWeather location={location} />
      </Card>
      <Card>
        <Box className='mock' height='404px' bg='#F2F2F7' />
      </Card>
      <Card>
        <Box className='mock' height='146px' bg='#F2F2F7' />
      </Card>
      <Card>
        <Box className='mock' height='157px' bg='#F2F2F7' />
      </Card>
    </Box>
  )
}

export default WeatherForecastHome
