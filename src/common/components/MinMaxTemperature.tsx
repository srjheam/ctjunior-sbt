import { HStack, Icon } from '@chakra-ui/react'
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import TemperatureIndicator from './TemperatureIndicator'

interface Props {
  max: number
  min: number
}

const MaxMinTemperature = ({ max, min }: Props) =>
  <HStack spacing='8px'>
    <HStack spacing='4px'>
      <Icon as={MdOutlineKeyboardArrowUp} width='20px' h='20px' />
      <TemperatureIndicator temperature={max} />
    </HStack>
    <HStack spacing='4px'>
      <Icon as={MdOutlineKeyboardArrowDown} width='20px' h='20px' />
      <TemperatureIndicator temperature={min} />
    </HStack>
  </HStack>

export default MaxMinTemperature
