import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from '../utils/constns'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

const Navigbar = observer(() => {
  const currentColor = localStorage.getItem('user')

  const { user } = useContext(Context)
  const history = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      style={{
        textAlign: 'center',
        justifyContent: 'center',
      }}
    >
      <Container>
        <NavLink
          style={{ color: 'white', textDecoration: 'none' }}
          to={SHOP_ROUTE}
        >
          Electronic shoper
        </NavLink>
        {currentColor ? (
          <Nav className="ml-auto " style={{ color: 'white' }}>
            <Button
              variant={'outline-light'}
              onClick={() => history(BASKET_ROUTE)}
              style={{ marginLeft: '1em' }}
            >
              Basket
            </Button>
            <Button
              variant={'outline-light'}
              onClick={() => history(ADMIN_ROUTE)}
              style={{ marginLeft: '1em' }}
            >
              Admin panel
            </Button>
            <Button
              variant={'outline-light'}
              onClick={() => {
                history(SHOP_ROUTE)
                localStorage.removeItem('user')
                logOut()
              }}
              style={{ marginLeft: '1em' }}
            >
              Exit
            </Button>
            <h6 style={{ marginLeft: '1em', marginTop: '0.4em' }}>
              {currentColor}
            </h6>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: 'white' }}>
            <Button
              variant={'outline-light'}
              onClick={() => history(LOGIN_ROUTE)}
            >
              Authorization
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
})

export default Navigbar
