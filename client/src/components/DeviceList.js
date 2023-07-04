import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from './../index'
import { Col, Row } from 'react-bootstrap'
import DeviceItem from './DeviceItem'
import { fetchDevice } from '../http/deviceAPI'
const DeviceList = observer(({ onChange }) => {
  const [devices, setDevices] = useState([])
  const { device } = useContext(Context)
  // fetchDevice().then((data) => console.log(data.rows))
  const change = (data) => {
    onChange(data)
  }
  useEffect(() => {
    setDevices(device.devices)
  }, [])
  console.log(device.devices)

  return (
    <Row className="shop-container_device--list" md={5}>
      {device.devices.length === 0 ? (
        <Col md={12}>
          <h1>No such devices</h1>
        </Col>
      ) : (
        device.devices.map((device) => (
          <DeviceItem key={device.id} device={device} isChange={change} />
        ))
      )}
    </Row>
  )
})
export default DeviceList
