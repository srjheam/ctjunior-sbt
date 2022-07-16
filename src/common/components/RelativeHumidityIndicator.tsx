import { useEffect, useState } from "react"
import { Center, Icon, Text } from "@chakra-ui/react"
import { WiHumidity } from "react-icons/wi"
import { openMeteoApi } from "../../services/axios"
import { getLocalizedDate } from "../helpers"
import { Location } from "../types"

const getRelativeHumidityNow = async (location: Location) =>
  await openMeteoApi.get('?', {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      hourly: ['relativehumidity_2m'],
      timezone: location.timezone
    }
  })
  .then(response =>
    response.data
  )
  .then(data => {
    const nowHours = getLocalizedDate(data.utc_offset_seconds).getUTCHours() % 24
    const nowIndex = data.hourly.time.findIndex((x: string) => new Date(x + 'Z').getUTCHours() % 24 == nowHours)
    console.log(data)
    return data.hourly.relativehumidity_2m[nowIndex] as number
  })

  const RelativeHumidityIndicator = ({ location }: { location: Location}) => {
    const [relativeHumidity, setRelativeHumidity] = useState(0)
    
    useEffect(() => {
      const fetchData = async () => {
        const humidity = await getRelativeHumidityNow(location)
        setRelativeHumidity(humidity)
      }

      fetchData() // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Center flexDirection='column'>
        <Text textAlign='center'>Umidade relativa</Text>
        <Icon as={WiHumidity} />
        <Text>{relativeHumidity}%</Text>
      </Center>
    )
}

export default RelativeHumidityIndicator
