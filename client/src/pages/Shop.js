import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { Context } from './../index'
import { fetchBrands, fetchDevice, fetchTypes } from '../http/deviceAPI'
import PaginCom from '../components/Pagination'

const Shop = observer(() => {
  const { device } = useContext(Context)
  const [reload, setReload] = useState(false)
  const change = (data) => {
    setReload(data)
  }
  useEffect(() => {
    fetchDevice(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      8
    ).then((data) => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedType, device.selectedBrand])
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
    fetchDevice(null, null, 1, 8)
      .then((data) => {
        device.setDevices(data.rows)
        device.setTotalCount(data.count)
      })
      .then(() => setReload(false))
  }, [reload])

  return (
    <Container>
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList onChange={change} />
          <PaginCom />
        </Col>
      </Row>
    </Container>
  )
})
export default Shop
