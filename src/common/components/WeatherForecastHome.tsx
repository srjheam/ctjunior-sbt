import { Box, Center } from "@chakra-ui/react"
import useLocalStorageState from "use-local-storage-state";
import Card from "./Card";
import CurrentWeatherCard from "./CurrentWeatherCard";
import HourlyWeather from "./HourlyWeather";
import RelativeHumidityIndicator from "./RelativeHumidityIndicator";
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
  const [location] = useLocalStorageState<Location>(SELECTED_LOCATION_LOCAL_STORAGE_KEY, {
    defaultValue: getFallbackLocation()
  })

  return (
    <Box style={{ columns: '2 372px', columnGap: '24px' }} margin='32px 0 24px'>
      <CurrentWeatherCard location={location} />
      <Card>
        <HourlyWeather location={location} />
      </Card>
      <Card>
        <Center>
          <RelativeHumidityIndicator location={location} />
        </Center>
      </Card>
    </Box>
  )
}

export default WeatherForecastHome
