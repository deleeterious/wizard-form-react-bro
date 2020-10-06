import React from 'react'
// css
import './App.css'
// containers
import Header from '../Header'
// pages
import FormsPage from '../../pages/FormsPage'
import UserListPage from '../../pages/UserListPage'

const App = () => {
  return (
    <div className="app">
      <Header />
      <FormsPage />
      <UserListPage />
    </div>
  )
}

export default App
