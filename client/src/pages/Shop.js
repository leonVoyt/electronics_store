import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import TypeBar from '../components/sortedBars/TypeBar'
import BrandBar from '../components/sortedBars/BrandBar'
import DeviceList from '../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { Context } from './../index'
import { fetchBrands, fetchDevice, fetchTypes } from '../http/deviceAPI'
import PaginCom from '../components/pagination/Pagination'
import LimitDevices from '../components/pagination/LimitDevices'
import FilterBar from '../components/sortedBars/FilterBar'
import '../styles/pages/Shop.css'

const Shop = observer(() => {
  const { device } = useContext(Context)
  const [reload, setReload] = useState(false)
  const [limit, setLimit] = useState(8)
  const [arr, setArr] = useState([])
  const [totalDevice, setTotalDevice] = useState(8)
  const [loading, setLoading] = useState(true)
  const getFiltred = async (property) => {
    localStorage.setItem('filter', property)
    let res = [...arr]
    if (property === 'ascending') {
      res = arr.sort((a, b) => {
        if (a.price > b.price) {
          return 1
        }
        if (a.price < b.price) {
          return -1
        }
        // a должно быть равным b
        return 0
      })
    } else if (property === 'descending') {
      res = arr.sort((a, b) => {
        if (a.price < b.price) {
          return 1
        }
        if (a.price > b.price) {
          return -1
        }
        // a должно быть равным b
        return 0
      })
    } else if (property === 'rating') {
      res = arr.sort((a, b) => {
        if (a.rating < b.rating) {
          return 1
        }
        if (a.rating > b.rating) {
          return -1
        }
        // a должно быть равным b
        //test
        return 0
      })
    }
    await device.setDevices(res)
    await setArr(res)
    return arr
  }

  const getLimit = (data) => {
    setLimit(data)
    device.setLimit(data)
  }
  const change = (data) => {
    setReload(data)
  }
  useEffect(() => {
    fetchDevice(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      limit
    )
      .then((data) => {
        device.setTotalCount(data.count)
        setArr(data.rows)
        setTotalDevice(data.count)
      })
      .then(() => device.setDevices(arr))
      .finally(() => setLoading(false))
  }, [device.page, device.selectedType, device.selectedBrand, limit, reload])
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
    fetchDevice(null, null, 1, limit)
      .then((data) => {
        device.setTotalCount(data.count)
      })
      .then(() => device.setDevices(arr))
      .then(() => {
        if (arr.length !== 0) {
          const item = localStorage.getItem('filter')
          getFiltred(item)
        }
      })
      .then(() => setReload(false))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={'grow'} />
  } else {
    return (
      <Container className="shop-container">
        <Row>
          <Col md={3} className="shop-container_left-bar">
            <TypeBar />
            <BrandBar />
          </Col>

          <Col md={9}>
            <div className="shop-container_filter">
              <LimitDevices limit={getLimit} />
              <FilterBar arr={arr} getFiltred={getFiltred} />
            </div>
            <hr />
            <DeviceList onChange={change} />
            <PaginCom total={totalDevice} />
          </Col>
        </Row>
      </Container>
    )
  }
})
export default Shop
