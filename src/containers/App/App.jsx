import React from 'react'
// css
import './App.css'
// containers
import Header from '../Header'
// pages
// import UserListPage from '../../pages/UserListPage'
import AddNewUserPage from '../../pages/AddNewUserPage'

const App = () => {
  return (
    <div>
      <Header />
      {/* <UserListPage /> */}
      <AddNewUserPage />
    </div>
  )
}

export default App
