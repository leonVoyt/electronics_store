import React from 'react'
import { Button, Card, Col, Image, Row } from 'react-bootstrap'
import star from '../assets/star.png'
import { useNavigate } from 'react-router-dom'
import { deleteOneDevice } from '../http/deviceAPI'

const DeviceItem = ({ device, isChange }) => {
  const history = useNavigate()
  const currentColor = localStorage.getItem('user')

  // console.log(device.id)
  const deleteDevice = () => {
    deleteOneDevice(device.id)
      .then(() => console.log('success'))
      .then(() => isChange(true))
      .catch((err) => console.log(err))
  }
  return (
    <Col>
      <Col
        md={3}
        className={'mt-3'}
        onClick={() => history(`/device/${device.id}`)}
      >
        <Card style={{ width: 150, cursor: 'pointer' }} border={'light'}>
          <Image
            width={150}
            height={150}
            src={process.env.REACT_APP_API_URL + device.img}
          />
          <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
            <div>{device.name}</div>
            <div className="d-flex align-items-center">
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
          style={{ marginTop: '0.5em' }}
          onClick={() => deleteDevice()}
        >
          delte
        </Button>
      )}
    </Col>
  )
}
export default DeviceItem
