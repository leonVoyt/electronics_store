import { useEffect, useState } from 'react'
import { getRating } from '../http/deviceAPI'

export const useCountRating = (deviceId, createRating) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    getRating(deviceId).then((data) => setCount(data))
    //   .then((data) => console.log(count))
  }, [createRating])

  return count
}
