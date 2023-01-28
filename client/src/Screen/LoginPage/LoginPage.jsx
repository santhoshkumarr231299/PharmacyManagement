import React, { Component } from "react";
import axios from "axios";
import "./styles.css";

class LoginPage extends Component {
  componentDidMount() {
    console.log(this.props.mainCom.state.user.username);
    axios.get("http://localhost:3000/logged-in").then((res) => {
      this.props.mainCom.reloadHandleLogin(res.data);
      if (res.data.username !== "") {
        console.log("called");
        return;
      }
    });
  }
  validateLogin(e) {   
    e.preventDefault();
    const user = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    axios.post("http://localhost:3000/login", user).then((res) => {
      if (res.data.message === "success") {
        console.log(res.data);
        this.props.mainCom.state.user.username = res.data.username;
        this.props.mainCom.state.user.role = res.data.role;
        this.props.mainCom.state.user.lastAccessedScreen =
          res.data.lastAccessedScreen;
        this.props.mainCom.handleLogin();
      } else {
        document.getElementById("alert").innerHTML = "Login Failed";
      }
    });
  }
  state = {};
  render() {
    return (
      <div className="container">
        <div className="form-box">
          <div className="header-form">
            <h4 className="text-primary text-center">
              <i
                className="fa fa-user-circle"
                style={{ fontSize: "110px" }}
              ></i>
            </h4>
            <div className="image"></div>
          </div>
          <div className="body-form">
            <form>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-secondary btn-block"
                onClick={(e) => this.validateLogin(e)}
              >
                LOGIN
              </button>
              <div className="message">
                <div></div>
                <div>
                  <a href="#">Forgot your password</a>
                </div>
              </div>
            </form>
            <span id="alert"></span>
            {/* <div className="social">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter-square"></i>
              </a>
              <a href="#">
                <i className="fab fa-google"></i>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
