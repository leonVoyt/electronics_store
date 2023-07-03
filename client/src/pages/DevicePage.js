import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Container, Image, Row, Button } from 'react-bootstrap'
import bigstar from '../assets/bigStar.png'
import { useParams } from 'react-router-dom'
import {
  createBasketDevice,
  createRating,
  fetchOneDevice,
  getRating,
  updateOneDeviceR,
} from './../http/deviceAPI'
import '../styles/pages/devicePage.css'

import { getUser } from '../http/userAPI'
import RatingImage from '../components/RatingImage'

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] })
  const { id } = useParams()
  const [userId, setUserId] = useState(0)
  const [rate, setRate] = useState(0)
  const currentUser = localStorage.getItem('user')
  // getRating(id).then((data) => console.log(data))

  useEffect(() => {
    // console.log(id)

    fetchOneDevice(id)
      .then((data) => setDevice(data))
      .then(() => getUser(currentUser).then((data) => setUserId(data.data.id)))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    // console.log(id)

    getRating(id).then((data) => {
      if (data.length !== 0) {
        let res = 0
        data.map((d) => (res += Number(d.name)))
        let average = (res / data.length).toFixed(1).toString()

        updateOneDeviceR(id, average)
          .then(() => fetchOneDevice(id))
          .then((data) => setDevice(data))
      }
    })
  }, [rate])

  async function addRating(rating) {
    let arr = []
    if (!currentUser) {
      return alert('you do`nt authorizated ')
    } else {
      await getRating(id).then((data) => {
        console.log(data)
        if (data.length !== 0) {
          data.map((d) => arr.push(d.userId))
        } else {
          return add()
        }
        if (arr.includes(userId)) {
          return alert('you already posted rating')
        } else {
          add()
        }
      })
    }
    async function add() {
      const formData = new FormData()
      formData.append('name', `${rating}`)
      formData.append('userId', `${userId}`)
      formData.append('deviceId', `${device.id}`)
      await createRating(formData).then((data) => setRate(data))
    }
  }

  async function addToBasket() {
    try {
      const formData = new FormData()
      formData.append('basketId', `${userId}`)
      formData.append('deviceId', `${device.id}`)
      await createBasketDevice(formData)
    } catch (error) {
      alert('you do`nt authorizated ')
    }
  }

  return (
    <Container className="devicePage_container">
      <Row>
        <Col md={4} className="devicePage_container-1part">
          <h3>{device.name}</h3>

          <Image
            width={300}
            height={300}
            src={
              process.env.REACT_APP_API_URL &&
              device.img &&
              process.env.REACT_APP_API_URL + device.img
            }
          ></Image>
        </Col>
        <Col md={4} className="devicePage_container-2part">
          <Row className="devicePage_container__row">
            <h3 style={{ position: 'absolute' }}>Rating</h3>
            <div className="devicePage_container__rating">
              <div
                className="devicePage_container__rating-bigstar"
                style={{
                  background: `url(${bigstar}) no-repeat center center`,
                }}
              >
                <div className="devicePage_container__bigstar-rating">
                  {device.rating}
                </div>
              </div>
            </div>
            <div className="devicePage_container__add-rating">Add rating</div>
            <div className="devicePage_container__rating-star">
              <div onClick={() => addRating(1)}>
                <RatingImage rating={1}></RatingImage>
              </div>
              <div onClick={() => addRating(2)}>
                <RatingImage rating={2}></RatingImage>
              </div>
              <div onClick={() => addRating(3)}>
                <RatingImage rating={3}></RatingImage>
              </div>
              <div onClick={() => addRating(4)}>
                <RatingImage rating={4}></RatingImage>
              </div>
              <div onClick={() => addRating(5)}>
                <RatingImage rating={5}></RatingImage>
              </div>
            </div>
          </Row>
        </Col>
        <Col md={4} className="devicePage_container-3part">
          <div className="devicePage_container__basket">
            <h3>price: {device.price}$</h3>
            <Button variant="outline-dark" onClick={() => addToBasket()}>
              Add to basket
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="devicePage_container__harakteristick">
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
