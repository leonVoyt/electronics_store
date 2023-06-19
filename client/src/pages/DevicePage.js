import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
const DevicePage = () => {
  const device = {
    id: 1,
    name: 'iphone 12 pro',
    price: '25000',
    rating: 0,
    img: `https://i.citrus.world/imgcache/size_800/uploads/shop/8/3/839452defe42b04a09b30f1915720093.jpg`,
  }
  return (
    <Container className="mt-3">
      <Col md={4}>
        <Image width={300} height={300} src={device.img}></Image>
      </Col>
      <Col md={4}>
        <Row>
          <h2>{device.name}</h2>
          <div className="d-flex align-items-center justify-content-center">
            {device.rating}
          </div>
        </Row>
      </Col>
      <Col md={4}></Col>
    </Container>
  )
}
export default DevicePage
