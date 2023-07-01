import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useMemo } from 'react'
import { Context } from '../../index'
import { Pagination } from 'react-bootstrap'
const PaginCom = observer(({ total }) => {
  const { device } = useContext(Context)
  const pages = []
  // console.log(total)
  const pageCount = Math.ceil(total / device.limit)
  for (let index = 0; index < pageCount; index++) {
    pages.push(index + 1)
  }

  return (
    <Pagination
      className="shop-container__pagination"
      style={{
        position: total > 4 && 'relative',
      }}
    >
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={device.page === page}
          onClick={() => device.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  )
})
export default PaginCom
