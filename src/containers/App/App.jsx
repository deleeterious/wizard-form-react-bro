import React from 'react'
// router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// css
import './App.css'
// containers
import Header from 'components/Header'
// pages
import FormsPage from 'pages/FormsPage'
import UserListPage from 'pages/UserListPage'
import ProfilePage from 'pages/ProfilePage/ProfilePage'

const App = () => (
  <Router className="app">
    <Header />
    <Switch>
      <Route path="/profile/:id" component={ProfilePage} />
      <Route path="/new-user" component={FormsPage} />
      <Route path="/" component={UserListPage} />
    </Switch>
  </Router>
)

export default App
