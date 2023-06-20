import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Container, Image, Row, Button } from 'react-bootstrap'
import bigstar from '../assets/bigStar.png'
import { useParams } from 'react-router-dom'
import { createRating, fetchOneDevice } from './../http/deviceAPI'
import { Context } from './../index'
import { getUser } from '../http/userAPI'
const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] })
  const { id } = useParams()
  const [userId, setUserId] = useState(0)
  useEffect(() => {
    fetchOneDevice(id)
      .then((data) => setDevice(data))
      .then(() =>
        getUser('user@mail.ua').then((data) => setUserId(data.data.id))
      )
  }, [])

  // const addRating = () => {
  //   createRating({ name: 5, userId: userId, deviceId: device.id })
  //   console.log(userId)
  // }

  const addRating = () => {
    // console.log(userId)
    const formData = new FormData()
    formData.append('name', '5')
    formData.append('userId', `${userId}`)
    formData.append('deviceId', `${device.id}`)
    createRating(formData)
    console.log(userId)
  }
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          ></Image>
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name} </h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigstar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: 'cover',
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
            <Button variant="outline-dark" onClick={() => addRating()}>
              Add rating
            </Button>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: '5px solid lightgray',
            }}
          >
            <h3>price: {device.price}$</h3>
            <Button variant="outline-dark">Add to basket</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Harakteristick</h1>
        {device.info.map((device, index) => (
          <Row
            key={device.id}
            style={{
              background: index % 2 === 0 ? 'lightgray' : 'transparent',
              padding: 10,
            }}
          >
            {device.title}: {device.description}
          </Row>
        ))}
      </Row>
    </Container>
  )
}
export default DevicePage
