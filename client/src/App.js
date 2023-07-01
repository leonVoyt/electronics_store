import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Navigbar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Context } from './index'
import { check } from './http/userAPI'
import { Spinner } from 'react-bootstrap'
import './styles/main.css'

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(true)
        user.setIsAuth(true)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={'grow'} />
  }
  return (
    <BrowserRouter>
      <Navigbar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
