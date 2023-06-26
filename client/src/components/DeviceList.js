import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from './../index'
import { Row } from 'react-bootstrap'
import DeviceItem from './DeviceItem'
const DeviceList = observer(({ onChange }) => {
  const [devices, setDevices] = useState(false)
  const { device } = useContext(Context)

  const change = (data) => {
    onChange(data)
  }
  useEffect(() => {
    setDevices(device.devices)
  }, [])
  return (
    <Row className="d-flex" md={4}>
      {device.devices.map((device) => (
        <DeviceItem key={device.id} device={device} isChange={change} />
      ))}
    </Row>
  )
})
export default DeviceList
