import './index.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster />

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App;
