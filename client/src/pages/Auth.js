import React, { useContext, useState } from 'react'
import { Container, Form, Card, Button } from 'react-bootstrap'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './../utils/constns'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from './../index'

const Auth = observer(() => {
  const history = useNavigate()
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const { user } = useContext(Context)
  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
      localStorage.setItem('user', email)

      user.setUser(user)
      user.setIsAuth(true)
      history(SHOP_ROUTE)
    } catch (error) {
      localStorage.removeItem('user')
      alert(error.response.data.message)
    }
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-3"
            placeholder="input your email"
          />
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            className="mt-3"
            placeholder="input your password"
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1em',
            }}
          >
            {isLogin ? (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                don`t have accaunt?
                <NavLink
                  to={REGISTRATION_ROUTE}
                  style={{ color: 'blue', marginLeft: '1em' }}
                >
                  Registration!
                </NavLink>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                have accaunt?
                <NavLink
                  to={LOGIN_ROUTE}
                  style={{ color: 'blue', marginLeft: '1em' }}
                >
                  Come in!
                </NavLink>
              </div>
            )}

            <Button variant={'outline-success'} onClick={click}>
              {isLogin ? 'Come in' : 'registration'}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
})
export default Auth
