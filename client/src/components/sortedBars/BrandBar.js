import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../../index'
import { Dropdown, SplitButton } from 'react-bootstrap'

const BrandBar = observer(() => {
  const { device } = useContext(Context)

  return (
    <div className="mt-3">
      {
        <SplitButton
          drop={'bot'}
          variant="secondary"
          title={
            device.selectedBrand.name
              ? device.selectedBrand.name
              : 'Select brand'
          }
          style={{ width: '14em' }}
        >
          {device.brands.map((brand) => (
            <div key={brand.id}>
              <Dropdown.Item
                style={{ cursor: 'pointer' }}
                onClick={() => device.setSelectedBrand(brand)}
                border={
                  brand.id === device.selectedBrand.id ? 'danger' : 'light'
                }
              >
                {brand.name}
              </Dropdown.Item>
              <Dropdown.Divider />
            </div>
          ))}
          <Dropdown.Item
            eventKey="4"
            onClick={() => device.setSelectedBrand({})}
          >
            All brands
          </Dropdown.Item>
        </SplitButton>
      }
    </div>
  )
})
export default BrandBar
