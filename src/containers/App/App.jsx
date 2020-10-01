import React from 'react'
// css
import './App.css'
// containers
import Header from '../Header'
// pages
import AddNewUserPage from '../../pages/AddNewUserPage'
// import UserListPage from '../../pages/UserListPage'

const App = () => {
  return (
    <div className="app">
      <Header />
      {/* <UserListPage /> */}
      <AddNewUserPage />
    </div>
  )
}

export default App
