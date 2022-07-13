import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useState } from 'react'
import { Box, Center, Link } from '@chakra-ui/react'
import type { Location } from '../common/types'
import SearchBox from '../common/components/SearchBox'

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

const Home: NextPage = () => {
  const [location, setLocation] = useState<Location>(getFallbackLocation())

  return (
    <Center h={'100vh'}>
      <NextLink href='/search' passHref>
        <Link>
          <Box pointerEvents={'none'}>
            <SearchBox />
          </Box>
        </Link>
      </NextLink>
    </Center>
  )
}

export default Home
