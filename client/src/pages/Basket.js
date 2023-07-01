import React, { useEffect, useState } from 'react'
import { fetchcUserBasketDevice } from '../http/deviceAPI'
import { observer } from 'mobx-react-lite'
import { getUser } from '../http/userAPI'
import { Row } from 'react-bootstrap'
import BasketItem from '../components/BasketDItem'
import { useTotalPrice } from './../hooks/useTotalPrice'
import '../styles/pages/Basket.css'

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
    if (getUser(currentColor)) {
      getUser(currentColor).then((data) => {
        if (data.data !== null) {
          setUserId(data.data.id)
        }
      })
    }
  }, [currentColor])
  useEffect(() => {
    if (userId !== 0) {
      fetchcUserBasketDevice(userId)
        .then((data) => setBasketItem(data))
        .catch((err) => console.log(err))
    }
    setReload(false)
    //
  }, [userId, reload])

  return (
    <div className="basket">
      <Row className="d-flex" md={basketItem.length < 5 ? 8 : 5}>
        {basketItem.map((device) => (
          <BasketItem key={device.id} device={device} isReload={set} />
        ))}
      </Row>
      <div className="basket_total-price">
        <div className="basket_total-price__price">
          total price: {totalPrice} $
        </div>
      </div>
    </div>
  )
})
export default Basket
