import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'
import star from '../assets/star.png'
import { useNavigate } from 'react-router-dom'
import { deleteUserBasketDevice, fetchOneDevice } from '../http/deviceAPI'

const BasketItem = ({ device, isReload }) => {
  const [basketDevice, setBasketDevice] = useState({})
  const history = useNavigate()
  const [reload, setReload] = useState(true)

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
    <Col className="d-flex">
      {!device.deviceId ? (
        <Col>
          <Col>
            <Col md={3} className={'mt-3'}>
              <Card style={{ width: 150, cursor: 'pointer' }} border={'light'}>
                <Image
                  width={150}
                  height={150}
                  src={process.env.REACT_APP_API_URL}
                />
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                  {/* <div>price:{basketDevice.price}$</div> */}

                  <div className="d-flex align-items-center"></div>
                </div>
              </Card>
            </Col>
            <Button
              style={{ marginTop: '1em' }}
              variant={'outline-danger'}
              onClick={() => {
                deleteDevice()
              }}
            >
              delete
            </Button>
          </Col>
        </Col>
      ) : (
        <Col className="d-flex">
          <Col className="d-inline-block">
            <Col
              md={3}
              className={'mt-3'}
              onClick={() => history(`/device/${device.deviceId}`)}
            >
              <Card style={{ width: 150, cursor: 'pointer' }} border={'light'}>
                <Image
                  width={150}
                  height={150}
                  src={process.env.REACT_APP_API_URL + basketDevice.img}
                />
                <div>price:{basketDevice.price}$</div>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                  {/* <div>price:{basketDevice.price}$</div> */}
                  <div>{basketDevice.name}</div>

                  <div className="d-flex align-items-center">
                    <div>{basketDevice.rating}</div>
                    <Image width={18} height={18} src={star} />
                  </div>
                </div>
                <Button
                  style={{ marginTop: '1em' }}
                  variant={'outline-success'}
                >
                  Buy
                </Button>
              </Card>
            </Col>
            <Button
              style={{ marginTop: '1em' }}
              variant={'outline-danger'}
              onClick={() => {
                deleteDevice()
              }}
            >
              delete
            </Button>
          </Col>
        </Col>
      )}
    </Col>
  )
}
export default BasketItem
