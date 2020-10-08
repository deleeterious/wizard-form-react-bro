import React from 'react'
// router
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
// css
import './App.css'
// components
import Header from 'components/Header'
// pages
import FormsPage from 'pages/FormsPage'
import UserListPage from 'pages/UserListPage'
import ProfilePage from 'pages/ProfilePage'
import EditPage from 'pages/EditPage/EditPage'

const App = () => (
  <Router className="app">
    <Header />
    <Switch>
      <Route path="/edit/:id" component={EditPage} />
      <Route path="/profile/:id" component={ProfilePage} />
      <Route path="/new-user" component={FormsPage} />
      <Route path="/" component={UserListPage} />
    </Switch>
    <Redirect to="/" />
  </Router>
)

export default App
