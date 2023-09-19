import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css'

import Navbar from "./components/Navbar"
import Management from './layouts/management/Management'
import Profile from './layouts/profile/Profile'
import Login from "./pages/Login"

function App() {

  return (
    <>
      <div className="container-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />}>
          <Route path="/management" element={<Management />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        
      </Routes>
      </div>
    </>
  )
}

export default App
