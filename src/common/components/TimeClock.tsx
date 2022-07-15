import { Text } from '@chakra-ui/react'
import { getLocalizedDate } from '../helpers'

interface Props {
  time?: Date
  utcOffsetSeconds?: number
}

const TimeClock = ({ time, utcOffsetSeconds }: Props) => {
  const clock = getLocalizedDate(utcOffsetSeconds ?? 0, time)
  
  return (
    <Text>
      {String(clock.getUTCHours() % 24).padStart(2, '0')}:{String(clock.getUTCMinutes() % 60).padStart(2, '0')}
    </Text>
  )
}

export default TimeClock
