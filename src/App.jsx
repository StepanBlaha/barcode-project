import { useEffect, useState } from 'react'
import './css/app.css'
import './css/index.css'

import AppRoutes from './routes.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//The main page component
function App() {

  return (
    <>
      <AppRoutes/>

    </>
  )
}

export default App