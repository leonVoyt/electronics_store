import React, { useEffect, useState } from 'react'
import { fetchcUserBasketDevice } from '../http/deviceAPI'
import { observer } from 'mobx-react-lite'
import { getUser } from '../http/userAPI'
import { Row } from 'react-bootstrap'
import BasketItem from '../components/BasketDItem'
import { useTotalPrice } from './../hooks/useTotalPrice'

const Basket = observer(() => {
  const currentColor = localStorage.getItem('user')
  const [userId, setUserId] = useState(0)
  const [basketItem, setBasketItem] = useState([])
  var totalPrice = useTotalPrice(basketItem.map((item) => item.deviceId))
  const [reload, setReload] = useState(false)
  const set = (data) => {
    setReload(data)
  }

  useEffect(() => {
    if (currentColor) {
      getUser(currentColor).then((data) => setUserId(data.data.id))
    }
  }, [currentColor])
  useEffect(() => {
    if (userId !== 0) {
      fetchcUserBasketDevice(userId).then((data) => setBasketItem(data))
    }
    setReload(false)
    //
  }, [userId, reload])

  return (
    <div
      className="basket"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        // paddingTop: '12em',
        padding: '1em',
      }}
    >
      <Row className="d-flex m-4">
        {basketItem.map((device) => (
          <BasketItem key={device.id} device={device} isReload={set} />
        ))}
      </Row>
      total price: {totalPrice} $
    </div>
  )
})
export default Basket
