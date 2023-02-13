import axios from "axios";
import React, { Component } from "react";

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
    };
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
        <form>
          <div>
            {this.fields.map((field) => (
              <div>
                <input
                  id={field.name}
                  type={field.type}
                  placeholder={field.pname}
                  required
                />
                <br />
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
      </div>
    );
  }
}

export default NewUserPage;
