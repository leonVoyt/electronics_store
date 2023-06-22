// import { useState } from 'react'
// import { fetchDevice } from '../http/deviceAPI'

// export function useTotalPrice(basketItem) {
//   const [allDevices, setAllDevices] = useState([])
//   const totalPrice = {}

//   if (allDevices.length < 1) {
//     fetchDevice().then((data) => setAllDevices(data.rows))
//   }
//   //   console.log(basketItem)
//   allDevices.map((item) => {
//     if (basketItem.includes(item.id)) {
//       totalPrice[item.id] = item.price
//     }
//   })
//   let res = basketItem.reduce(
//     (accumulator, currentValue) => accumulator + totalPrice[currentValue],
//     0
//   )
//   return res
// }
import { useState } from 'react'
import { fetchDevice } from '../http/deviceAPI'

export function useTotalPrice(basketItem) {
  const [allDevices, setAllDevices] = useState([])
  const totalPrice = {}

  if (allDevices.length < 1) {
    fetchDevice().then((data) => setAllDevices(data.rows))
  }
  //   console.log(basketItem)
  allDevices.map((item) => {
    if (basketItem.includes(item.id)) {
      totalPrice[item.id] = item.price
    }
  })
  let res = basketItem.reduce(
    (accumulator, currentValue) => accumulator + totalPrice[currentValue],
    0
  )
  return res
}
