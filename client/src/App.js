import React, { Component } from 'react'
import './App.css';
import MainPage from './Screen/MainPage/MainPage';
import LoginPage from './Screen/LoginPage/LoginPage';
import NewUserPage from './Screen/NewUserPage/NewUserPage';
import MedicinePage from './Screen/Medicine/MedicinePage';
// import axios from 'axios';
class App extends Component {
  state = { user : {
    username : '',
    role : '',
    lastAccessedScreen : 0,
  } } 
  handleLogin = () => {
    this.setState(this.state.user);
  }
  reloadHandleLogin = (userData) => {
    if(!userData.username)
    {
        return;
    }
    this.state.user.username = userData.username;
    this.state.user.role = userData.role;
    this.state.user.lastAccessedScreen = userData.lastAccessedScreen;
    this.setState(this.state.user);
    return ;
  }
  inOrOut = () => {
    if(this.state.user.username === '') {
      return <MedicinePage mainCom={this}/>;
    }
    else {
      return <MainPage mainCom={this}/>;
    }
  }
  render() {
    return (
      <div className="App">
      {this.inOrOut()}
    </div>
    );
  }
}

export default App;

