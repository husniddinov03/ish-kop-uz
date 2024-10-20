import React from 'react'
import { Route, Routes } from 'react-router-dom'
import "./App.css"
import Home from './Routes/Home'
import Sider from 'antd/es/layout/Sider'
import SiderLayout from './Routes/SiderLayout'

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/*' element={<SiderLayout />} />
      </Routes>
    </div>
  )
}

export default App