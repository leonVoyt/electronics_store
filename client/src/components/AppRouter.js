import React, { useContext } from 'react'
import { Switch, Route, Redirect, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { Context } from './../index'
const AppRouter = () => {
  const isAuth = false
  const { user } = useContext(Context)
  console.log(user)
  return (
    <Routes>
      {user.isAuth === true &&
        authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} exact />
      ))}
    </Routes>
  )
}
export default AppRouter
