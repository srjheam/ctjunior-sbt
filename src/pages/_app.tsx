import { ChakraProvider, Box } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box maxW={'1202px'} margin={'0 auto'} padding='80px 0 0'>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
