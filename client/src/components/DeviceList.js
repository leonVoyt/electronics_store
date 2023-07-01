import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from './../index'
import { Row } from 'react-bootstrap'
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

  return (
    <Row className="shop-container_device--list" md={5}>
      {device.devices.map((device) => (
        <DeviceItem key={device.id} device={device} isChange={change} />
      ))}
    </Row>
  )
})
export default DeviceList
