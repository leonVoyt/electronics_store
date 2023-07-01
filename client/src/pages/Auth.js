import React, { useContext, useState } from 'react'
import { Container, Form, Card, Button } from 'react-bootstrap'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './../utils/constns'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from './../index'
import '../styles/pages/Auth.css'

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
      className="auth-container"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card className="auth-container__card">
        <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
        <Form className="auth-container__card__form">
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="input your email"
          />
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            placeholder="input your password"
          />
          <div className="auth-container__card__form__content">
            {isLogin ? (
              <div
                className="auth-container__card__form__content__text"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                don`t have accaunt?
                <NavLink to={REGISTRATION_ROUTE}>Registration!</NavLink>
              </div>
            ) : (
              <div className="auth-container__card__form__content__text">
                have accaunt?
                <NavLink to={LOGIN_ROUTE}>Come in!</NavLink>
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
