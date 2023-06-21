import React, { Children, useEffect, useRef } from 'react'
import { Image } from 'react-bootstrap'
import useHover from '../hooks/useHover'
import star from '../assets/star.png'
import '../styles/main.css'
const RatingImage = ({ rating }) => {
  const ref = useRef()
  const isHover = useHover(ref)
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Image
          className={isHover.isHover && 'RatingImage'}
          ref={ref}
          style={{
            width: 30,
            cursor: 'pointer',
          }}
          src={star}
        ></Image>
      </div>
      {rating}
    </div>
  )
}
export default RatingImage
