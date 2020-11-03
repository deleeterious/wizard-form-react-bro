import React from 'react';
// router
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
// css
import './App.css';
// components
import Header from 'components/Header';
// pages
import FormsPage from 'pages/FormsPage';
import UserListPage from 'pages/UserListPage';
import ProfilePage from 'pages/ProfilePage';
import EditPage from 'pages/EditPage/EditPage';

const App = () => (
  <div className="app">
    <Router>
      <Header />
      <Switch>
        <Route exact path="/profile/:id" component={ProfilePage} />
        <Route exact path="/edit/:id/:activeFormStage" component={EditPage} />
        <Route exact path="/new-user/:activeFormStage" component={FormsPage} />
        <Route exact path="/:num" component={UserListPage} />
        <Redirect to="/1" />
      </Switch>
    </Router>
  </div>
);

export default App;
