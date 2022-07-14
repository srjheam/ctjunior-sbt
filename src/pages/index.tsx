import type { NextPage } from 'next'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import SearchBox from '../common/components/SearchBox'
import WeatherForecastHome from '../common/components/WeatherForecastHome'

const Home: NextPage = () => {
  return (
    <>
      <NextLink href='/search' passHref>
        <Link>
          <SearchBox />
        </Link>
      </NextLink>
      <WeatherForecastHome />
    </>
  )
}

export default Home
