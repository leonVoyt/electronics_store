import { useEffect, useMemo, useState } from 'react'
import { fetchDevice } from '../http/deviceAPI'

export function useTotalPrice(basketItem) {
  const [allDevices, setAllDevices] = useState([])
  const totalPrice = {}
  const memoizedValue = useMemo(() => {
    if (allDevices.length < 1) {
      fetchDevice().then((data) => setAllDevices(data.rows))
    }
    if (allDevices.length !== 0) {
      allDevices.map((item) => {
        if (basketItem.includes(item.id)) {
          totalPrice[item.id] = item.price
        }
      })
      let res = basketItem.reduce(
        (accumulator, currentValue) =>
          currentValue !== null && accumulator + totalPrice[currentValue],
        0
      )
      console.log(basketItem)
      return res
    }
  }, [basketItem.length])
  return memoizedValue
}
