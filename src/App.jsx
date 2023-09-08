import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Navbar from "./components/Navbar"
import Management from './layouts/management/Management'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <div className="container-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Management />} />
      </Routes>
      </div>

      </BrowserRouter>
    </>
  )
}

export default App
