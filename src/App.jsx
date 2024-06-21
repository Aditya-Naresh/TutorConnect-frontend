import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import "react-toastify/ReactToastify.css"
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <>
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/login'  element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
    </>
  )
}

export default App