import axios from "axios";
import React, { Component } from "react";
import "../LoginPage/styles.css";

class NewUserPage extends Component {
  fields = [
    {
      name: "username",
      type: "text",
      pname: "Username",
      iconType: "user",
    },
    {
      name: "password",
      type: "password",
      pname: "Password",
      iconType: "lock",
    },
    {
      name: "phone",
      type: "number",
      pname: "Phone Number",
      iconType: "mobile",
    },
    {
      name: "email",
      type: "email",
      pname: "Email",
      iconType: "inbox",
    },
  ];
  createUser = (e) => {
    e.preventDefault();
    const user = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      //   role: document.getElementById("role"),
    };
    console.log(user);
    axios.post("http://localhost:3000/new-user", user).then((resp) => {
      if (resp.data) {
        if (resp.data.message === "success") {
          window.alert("New User Created Successfully");
        } else {
          window.alert("failed");
        }
      }
    });
  };
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
              <div>
                {this.fields.map((field) => (
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class={"fa fa-" + field.iconType}></i>
                      </span>
                    </div>
                    <input
                      id={field.name}
                      type={field.type}
                      className="form-control"
                      placeholder={field.pname}
                      required
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="btn btn-secondary btn-block"
                  onClick={(e) => this.createUser(e)}
                >
                  CREATE ACCOUNT
                </button>
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

export default NewUserPage;
