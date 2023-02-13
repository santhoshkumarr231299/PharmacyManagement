import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import MainPage from './Screen/MainPage/MainPage';
import LoginPage from './Screen/LoginPage/LoginPage';
import NewUser from './Screen/NewUserPage/NewUserPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/newuser" element={<NewUser />} />
      </Routes>
    </BrowserRouter>
      </div>
    );
  }
}

export default App;

