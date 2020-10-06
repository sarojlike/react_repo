import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import CreateUserComponent from './components/CreateUserComponent';
import ListUserComponent from './components/ListUserComponent';
import UpdateUser from './components/UpdateUser';

function App() {
  return (
      <div className="container">
        <Router> 

        <Route path="/" exact component={CreateUserComponent} />  
        <Route path="/listUser" component={ListUserComponent} />
        <Route path="/update-user" component={UpdateUser} />
       

        </Router>
      </div>
  );
}

export default App;
