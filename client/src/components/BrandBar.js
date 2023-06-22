import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from './../index'
import { Card, Row } from 'react-bootstrap'

const BrandBar = observer(() => {
  const { device } = useContext(Context)

  return (
    <div className="d-flex" style={{ textAlign: 'center' }}>
      {device.brands.map((brand) => (
        <Card
          style={{ cursor: 'pointer' }}
          key={brand.id}
          className="p-3"
          onClick={() => device.setSelectedBrand(brand)}
          border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
        >
          {brand.name}
        </Card>
      ))}
      <Card
        style={{
          cursor: 'pointer',
          paddingTop: '0.9em',
        }}
        border={'light'}
        onClick={() => device.setSelectedBrand({})}
      >
        All type
      </Card>
    </div>
  )
})
export default BrandBar
