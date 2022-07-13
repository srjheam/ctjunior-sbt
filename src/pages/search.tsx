import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { Center, Spinner, Stack, Text } from '@chakra-ui/react'
import { geocodingApi } from '../services/axios';
import useLocalStorageState from 'use-local-storage-state'
import LocationList from '../common/components/LocationList';
import SearchBox from '../common/components/SearchBox'
import { SELECTED_LOCATION_LOCAL_STORAGE_KEY } from '../common/constants';
import type { Location } from '../common/types'

const RECENT_LOCATIONS_LOCAL_STORAGE_KEY:string = 'recents'
const RECENT_LOCATIONS_QUEUE_MAX_LENGTH = 20

const searchByQuery = async (query: string): Promise<Location[]> =>
  await geocodingApi.get('?', {
    params: {
      name: query,
      language: 'pt',
      count: 100
    }
  })
  .then(response =>
    response.data.results as any[]
  )
  .then(results =>
    results.map<Location>(x => {
      const transformed:Location = x
      transformed.state = x.admin1
      return transformed
    })
  )
  .catch(() =>
    []
  )

const Search: NextPage = () => {
  const enqueueToRecent = (location: Location) => {
    let newRecents = [...recentLocations]

    // remove all occurences of location already in Recents
    newRecents = newRecents.reduce<Location[]>((acc, x) => {
      if (x.id !== location.id)
        acc.push(x)
      
      return acc
    }, [])

    if (newRecents.length >= RECENT_LOCATIONS_QUEUE_MAX_LENGTH) {
      newRecents.pop()
    }

    newRecents.unshift(location)
    setRecentLocations(newRecents)
  }

  const handleLocationSelected = (location: Location) => {
    setSelectedLocation(location)
    enqueueToRecent(location)
    router.push('/')
  }

  const router = useRouter()

  const [, setSelectedLocation] = useLocalStorageState<Location>(SELECTED_LOCATION_LOCAL_STORAGE_KEY)
  const [recentLocations, setRecentLocations] = useLocalStorageState<Location[]>(RECENT_LOCATIONS_LOCAL_STORAGE_KEY, {
    defaultValue: []
  })

  const [query, setQuery] = useState('')
  const [queryResults, setQueryResults] = useState<Location[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query == '') {
      return
    }

    const fetchResults = async () => {
      setLoading(true)
      const results = await searchByQuery(query)
      setQueryResults(results)
      setLoading(false)
    }
    fetchResults()
  }, [query])

  return (
    <Stack h='100vh' spacing='24px'>
      <SearchBox onQueryChange={setQuery} />
      {!query ?
        <>
          <Stack spacing='16px'>
            <Text>Sua localização</Text>
            { /* <WeatherCard /> */ }
          </Stack>
          {recentLocations.length !== 0 &&
            <Stack spacing='16px'>
              <Text>Recentes</Text>
              <LocationList list={recentLocations} onClick={handleLocationSelected} />
            </Stack>
          }
        </>
        :
        <>
          {queryResults?.length > 0 ?
            <Stack spacing='16px'>
              <Text>Resultados da busca</Text>
              <LocationList list={queryResults} onClick={handleLocationSelected} />
            </Stack>
            :
            <Center h='100%'>
              {loading ?
                <Spinner />
                :
                <Text>
                  Nenhum resultado encontrado
                </Text>
              }
            </Center>
          }
        </>
      }
    </Stack>
  )
}

export default Search
