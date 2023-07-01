import React from 'react'
import { Dropdown, SplitButton } from 'react-bootstrap'
import '../../styles/Bar/FilterBar.css'
const FilterBar = ({ arr, getFiltred }) => {
  const filterDevice = (property) => {
    getFiltred(property)
  }

  return (
    <div className="container-filterBar">
      {
        <SplitButton
          drop={'bot'}
          variant="secondary"
          title={'Filter by'}
          style={{ width: '8em' }}
        >
          <Dropdown.Item onClick={() => filterDevice('rating')}>
            rating
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item onClick={() => filterDevice('ascending')}>
            ascending price
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item onClick={() => filterDevice('descending')}>
            descending price
          </Dropdown.Item>
        </SplitButton>
      }
    </div>
  )
}

export default FilterBar
