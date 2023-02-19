import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import MainPage from './Screen/MainPage/MainPage';
import LoginPage from './Screen/LoginPage/LoginPage';
import NewUser from './Screen/NewUserPage/NewUserPage';

class App extends Component {
  theme = {
    color : "white",
    bgColor : "purple",
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage theme = {this.theme} />} />
          <Route path="/login" element={<LoginPage theme = {this.theme} />} />
          <Route path="/newuser" element={<NewUser theme = {this.theme} />} />
      </Routes>
    </BrowserRouter>
      </div>
    );
  }
}

export default App;

