import { Box } from "@chakra-ui/react"

const Card = ({ children }: {children: JSX.Element | JSX.Element[]}) =>
  <Box display='inline-block' w='100%' margin='24px auto 0' padding='12px' borderRadius='10px' borderWidth='1px'>
    {children}
  </Box>

export default Card
