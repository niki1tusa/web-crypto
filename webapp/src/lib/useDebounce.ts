import { useEffect, useState } from "react"

export const useDebounce = ({
  value,
  time,
}: {
  value: any
  time: number
}) => {
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(value)
    }, time)
    
    return () => {
      clearTimeout(timer)
    }
  }, [value])
  return debouncedSearch
}
