import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Navigbar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Navigbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
