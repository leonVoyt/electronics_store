import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/constns'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

const Navigbar = observer(() => {
  const { user } = useContext(Context)
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>
          Electronic shoper
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: 'white' }}>
            <Button variant={'outline-light'}>Admin panel</Button>
            <Button variant={'outline-light'} style={{ marginLeft: '1em' }}>
              Come in
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: 'white' }}>
            <Button
              variant={'outline-light'}
              onClick={() => user.setIsAuth(true)}
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
