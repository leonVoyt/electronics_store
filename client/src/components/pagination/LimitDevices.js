import React, { useState } from 'react'
import { Dropdown, SplitButton } from 'react-bootstrap'

const LimitDevices = ({ limit }) => {
  const [value, setValue] = useState(8)

  return (
    <div className="shop-container_filter__item">
      {
        <SplitButton
          className="shop-container_filter__item__button"
          drop={'end'}
          variant="secondary"
          title={`limit is ${value}`}
        >
          <Dropdown.Item
            className="shop-container_filter__item__variants"
            value={'4'}
            onClick={(e) => {
              setValue(4)
              limit(4)
            }}
          >
            4
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item
            className="shop-container_filter__item__button"
            onClick={() => {
              setValue(8)
              limit(8)
            }}
          >
            8
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item
            className="shop-container_filter__item__button"
            onClick={() => {
              setValue(16)
              limit(16)
            }}
          >
            16
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item
            className="shop-container_filter__item__button"
            onClick={() => {
              setValue(32)
              limit(32)
            }}
          >
            32
          </Dropdown.Item>
        </SplitButton>
      }
    </div>
  )
}

export default LimitDevices
