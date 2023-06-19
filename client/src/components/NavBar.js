import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink, useNavigate } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/constns'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

const Navigbar = observer(() => {
  const { user } = useContext(Context)
  const history = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>
          Electronic shoper
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: 'white' }}>
            <Button
              variant={'outline-light'}
              onClick={() => history(ADMIN_ROUTE)}
            >
              Admin panel
            </Button>
            <Button
              variant={'outline-light'}
              onClick={() => logOut()}
              style={{ marginLeft: '1em' }}
            >
              Exit
            </Button>
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
