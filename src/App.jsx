import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css'

import Navbar from "./components/Navbar"
import Management from './layouts/management/Management'
import Profile from './layouts/profile/Profile'

function App() {

  return (
    <>
      {/* <BrowserRouter> */}
      <div className="container-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Management />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      </div>

      {/* </BrowserRouter> */}
    </>
  )
}

export default App
