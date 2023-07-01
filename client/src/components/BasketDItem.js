import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'
import star from '../assets/star.png'
import { useNavigate } from 'react-router-dom'
import { deleteUserBasketDevice, fetchOneDevice } from '../http/deviceAPI'
import '../styles/BasketDItem.css'
import notAvaible from '../assets/287.jpg'
import useHover from '../hooks/useHover'
const BasketItem = ({ device, isReload }) => {
  const [basketDevice, setBasketDevice] = useState({})
  const history = useNavigate()
  const [reload, setReload] = useState(true)
  const ref = useRef()

  const isHover = useHover(ref)
  const deleteDevice = () => {
    deleteUserBasketDevice(device.id)
      .catch((err) => console.log(err))
      .then(() => setReload(true))
      .then(() => {
        isReload(reload)
      })
  }

  useEffect(() => {
    if (device.deviceId) {
      fetchOneDevice(device.deviceId).then((data) => setBasketDevice(data))
    }
  }, [reload, device.deviceId])
  return (
    <Col className="container-basketItem">
      {!device.deviceId ? (
        <Col>
          <Col md={3}>
            <div className="container-basketItem__card">
              <Image
                ref={ref}
                style={{ transform: isHover.isHover && 'scale(1.1)' }}
                width={150}
                height={150}
                src={notAvaible}
              />
              <div className="container-basketItem__card__device">
                <div className="container-basketItem__card__rating">
                  Device is not actuality
                </div>
              </div>
            </div>
          </Col>
          <Button
            variant={'outline-danger'}
            onClick={() => {
              deleteDevice()
            }}
          >
            delete
          </Button>
        </Col>
      ) : (
        <Col className="container-basketItem">
          <Col
            md={3}
            className={'mt-3'}
            onClick={() => history(`/device/${device.deviceId}`)}
          >
            <Card border={'light'} className="container-basketItem__card">
              <Image
                ref={ref}
                style={{ transform: isHover.isHover && 'scale(1.1)' }}
                width={150}
                height={150}
                src={
                  process.env.REACT_APP_API_URL &&
                  basketDevice.img &&
                  process.env.REACT_APP_API_URL + basketDevice.img
                }
              />
              <div>price:{basketDevice.price}$</div>
              <div className="container-basketItem__card__device">
                <div>{basketDevice.name}</div>

                <div className="container-basketItem__card__rating">
                  <div>{basketDevice.rating}</div>
                  <Image width={18} height={18} src={star} />
                </div>
              </div>
              <Button variant={'outline-success'}>Buy</Button>
            </Card>
          </Col>
          <Button
            variant={'outline-danger'}
            onClick={() => {
              deleteDevice()
            }}
          >
            delete
          </Button>
        </Col>
      )}
    </Col>
  )
}
export default BasketItem
