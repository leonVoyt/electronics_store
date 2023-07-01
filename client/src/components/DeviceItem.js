import React, { useRef } from 'react'
import { Button, Card, Col, Image, Row } from 'react-bootstrap'
import star from '../assets/star.png'
import { useNavigate } from 'react-router-dom'
import { deleteOneDevice } from '../http/deviceAPI'
import '../styles/BasketDItem.css'
import useHover from '../hooks/useHover'
const DeviceItem = ({ device, isChange }) => {
  const history = useNavigate()
  const currentColor = localStorage.getItem('user')
  const ref = useRef()

  const isHover = useHover(ref)

  // console.log(device.id)
  const deleteDevice = () => {
    deleteOneDevice(device.id)
      .then(() => console.log('success'))
      .then(() => isChange(true))
      .catch((err) => console.log(err))
  }
  return (
    <Col className="container-basketItem">
      <Col
        md={3}
        className={'mt-3'}
        onClick={() => history(`/device/${device.id}`)}
      >
        <Card className={'container-basketItem__card'} border={'light'}>
          <Image
            ref={ref}
            style={{ transform: isHover.isHover && 'scale(1.1)' }}
            width={150}
            height={150}
            src={process.env.REACT_APP_API_URL + device.img}
          />
          <div className="container-basketItem__card__device">
            <div>{device.name}</div>
            <div className="container-basketItem__card__rating">
              <div>{device.rating}</div>
              <Image width={18} height={18} src={star} />
            </div>
          </div>
          <div> {device.price}$</div>
        </Card>
      </Col>
      {currentColor && (
        <Button
          variant={'outline-danger'}
          onClick={() => {
            deleteDevice()
          }}
        >
          delte
        </Button>
      )}
    </Col>
  )
}
export default DeviceItem
