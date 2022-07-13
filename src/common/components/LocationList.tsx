import { Box, Stack } from "@chakra-ui/react"
import WeatherCard from "./WeatherCard"
import type { Location } from "../types"

interface Props {
  list: Location[]
  onClick?: (location: Location) => void
}

const LocationList = ({ list, onClick }: Props) => {
  const isClickable = typeof onClick !== 'undefined'

  const handleClick = (location: Location) => {
    if (isClickable)
      onClick(location)
  }

  return (
    <>
      {list.map(location =>
        <Box key={location.id} onClick={() => handleClick(location)} cursor={isClickable ? 'pointer' : 'default'} >
          <WeatherCard location={location} />
        </Box>
      )}
    </>
  )
}

export default LocationList
