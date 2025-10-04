import { useState } from 'react'
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import { BrowserRouter, Routes, Route, Navigate } from "react-router"

function App() {
    return (
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
    )
}

export default App
