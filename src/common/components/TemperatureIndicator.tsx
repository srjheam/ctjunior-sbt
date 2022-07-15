import { HStack, Text } from "@chakra-ui/react";

interface Props {
  temperature: number
  size?: string
}

const TemperatureIndicator = ({ temperature, size }: Props) => {
  const fontSize = size ?? '20px'
  
  return (
    <HStack spacing='0' fontSize={fontSize}>
      <Text>{Math.round(temperature)}</Text>
      <Text fontSize='max(20px, .7em)'>°</Text>
    </HStack>
  )
}

export default TemperatureIndicator