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
    <Route component={Header} />
    <Switch>
      <Route exact path="/edit/:id" component={EditPage} />
      <Route exact path="/profile/:id" component={ProfilePage} />
      <Route exact path="/new-user" component={FormsPage} />
      <Route exact path="/" component={UserListPage} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </Router>
)

export default App
