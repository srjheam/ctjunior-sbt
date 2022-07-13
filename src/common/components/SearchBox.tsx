import { useEffect, useState } from "react"
import { Input } from "@chakra-ui/react"
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
    <Input type={'text'} value={debouncedInput} onChange={e => setDebouncedInput(e.target.value)} />
  )
}

export default SearchBox
