import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createTypeInDb } from '../../http/deviceAPI'
const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState('')
  const addType = () => {
    createTypeInDb({ name: value }).then((data) => setValue(''))
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Input name of type"
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-danger'} onClick={onHide}>
          Close
        </Button>
        <Button variant={'outline-success'} onClick={addType}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default CreateType
