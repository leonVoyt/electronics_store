import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { Context } from './../../index'
import { fetchBrands, fetchTypes } from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'
import { createDevice } from './../../http/deviceAPI'
const CreateDevice = observer(({ show, onHide, state }) => {
  const { device } = useContext(Context)
  const [info, setInfo] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number))
  }
  const selectFile = (e) => {
    setFile(e.target.files[0])
  }
  const fetch = () => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
  }

  useEffect(() => {
    fetch()
  }, [state])

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    if (
      !name ||
      !price ||
      !file ||
      !device.selectedBrand.id ||
      !device.selectedBrand.id
    ) {
      alert('form don`t filled')
    } else {
      createDevice(formData).then(() => onHide())
      device.setSelectedType({})
      device.setSelectedBrand({})
    }
  }
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2">
            <Dropdown.Toggle>
              {device.selectedType.name || 'select type'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2">
            <Dropdown.Toggle>
              {device.selectedBrand.name || 'select brand'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-3"
            placeholder="input name of device"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="input price of device"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button variant="outline-dark" onClick={addInfo}>
            Add new property
          </Button>
          {info.map((inf) => (
            <Row className="mt-4" key={inf.number}>
              <Col md={4}>
                <Form.Control
                  placeholder="input name of property"
                  value={inf.title}
                  onChange={(e) =>
                    changeInfo('title', e.target.value, inf.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="input description of property"
                  value={inf.description}
                  onChange={(e) =>
                    changeInfo('description', e.target.value, inf.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Button
                  variant="outline-danger"
                  onClick={() => removeInfo(inf.number)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-danger'} onClick={onHide}>
          Close
        </Button>
        <Button variant={'outline-success'} onClick={addDevice}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
})
export default CreateDevice
