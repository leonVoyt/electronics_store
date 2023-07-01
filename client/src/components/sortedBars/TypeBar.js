import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../../index'
import { ButtonGroup, Dropdown, SplitButton } from 'react-bootstrap'
import '../../styles/Bar/TypeBar.css'
const TypeBar = observer(() => {
  const { device } = useContext(Context)
  return (
    <div className="type-bar-container">
      {
        <SplitButton
          className="main"
          as={ButtonGroup}
          drop={'bot'}
          variant="secondary"
          title={
            device.selectedType.name ? device.selectedType.name : 'Select Type'
          }
          style={{ width: '14em' }}
        >
          {device.types.map((type) => (
            <Dropdown.Item
              style={{ cursor: 'pointer' }}
              key={type.id}
              className="type-bar-container__dropdown-item"
              onClick={() => device.setSelectedType(type)}
            >
              {type.name}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />

          <Dropdown.Item
            className="type-bar-container__dropdown-item"
            eventKey="4"
            onClick={() => device.setSelectedType({})}
          >
            All types
          </Dropdown.Item>
        </SplitButton>
      }
    </div>
  )
})
export default TypeBar
