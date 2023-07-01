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
import '../styles/Bar/NavigBar.css'

const Navigbar = observer(() => {
  const currentColor = localStorage.getItem('user')

  const { user } = useContext(Context)
  const history = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }
  return (
    <Navbar className="navbar" bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink className="navbar__logo" to={SHOP_ROUTE}>
          Electronic shoper
        </NavLink>
        {currentColor ? (
          <Nav className="navbar__btns">
            <Button
              variant={'outline-light'}
              onClick={() => history(BASKET_ROUTE)}
            >
              Basket
            </Button>
            <Button
              variant={'outline-light'}
              onClick={() => history(ADMIN_ROUTE)}
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
            >
              Exit
            </Button>
            <h6>{currentColor}</h6>
          </Nav>
        ) : (
          <Nav className="navbar__btns">
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
