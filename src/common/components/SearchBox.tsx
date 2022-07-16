import { useEffect, useState } from "react"
import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { MdSearch } from "react-icons/md"
import type { Dispatcher } from "../types"

interface Props {
  onQueryChange?:Dispatcher<string>
}

const SearchBox = ({onQueryChange}: Props) => {
  const [debouncedInput, setDebouncedInput] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onQueryChange !== 'undefined')
        onQueryChange(debouncedInput)
    }, 1000)
    return () => clearTimeout(timer) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput])

  return (
    <InputGroup>
      <InputLeftElement pointerEvents='none'>
        <Icon as={MdSearch} />
      </InputLeftElement>
      <Input type={'text'} value={debouncedInput} onChange={e => setDebouncedInput(e.target.value)} placeholder='Procurar por cidade...' />
    </InputGroup>
  )
}

export default SearchBox
