import React from 'react'
import { Container, Form, Card, Button } from 'react-bootstrap'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from './../utils/constns'
import { NavLink, useLocation } from 'react-router-dom'
const Auth = () => {
  const location = useLocation()
  console.log(location)
  const isLogin = location.pathname === LOGIN_ROUTE
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control className="mt-3" placeholder="input your email" />
          <Form.Control className="mt-3" placeholder="input your password" />
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

            <Button variant={'outline-success'}>
              {isLogin ? 'Come in' : 'registration'}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
}
export default Auth
