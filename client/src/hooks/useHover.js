import { useEffect, useState } from 'react'

export default function useHover(ref) {
  const [isHover, SetIsHover] = useState(false)

  const on = () => SetIsHover(true)
  const off = () => SetIsHover(false)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const node = ref.current
    node.addEventListener('mouseenter', on)
    node.addEventListener('mousemove', on)
    node.addEventListener('mouseleave', off)

    return function () {
      node.removeEventListener('mouseenter', on)
      node.removeEventListener('mousemove', on)
      node.removeEventListener('mouseleave', off)
    }
  }, [])
  return { isHover }
}
