import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/index.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='*' />
      </Routes>
    </Router>
  )
}

export default App
