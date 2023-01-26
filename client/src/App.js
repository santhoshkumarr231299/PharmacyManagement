import React, { Component } from 'react'
import './App.css';
import MainPage from './Screen/MainPage/MainPage';
import LoginPage from './Screen/LoginPage/LoginPage';
class App extends Component {
  state = {
    user: {
      username: '',
      role: '',
      lastAccessedScreen: 0,
    }
  }
  
  handleLogin = () => {
    this.setState(this.state.user);
  }
  reloadHandleLogin = (userData) => {
    if (!userData.username) {
      return;
    }
    this.state.user.username = userData.username;
    this.state.user.role = userData.role;
    this.state.user.lastAccessedScreen = userData.lastAccessedScreen;
    this.setState(this.state.user);
    return;
  }
  inOrOut = () => {
    if (this.state.user.username === '') {
      return <LoginPage mainCom={this} />;
    }
    else {
      return <MainPage mainCom={this} />;
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

