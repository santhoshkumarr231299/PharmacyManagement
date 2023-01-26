import React, { Component } from "react";
import { TextField, Button } from "@mui/material";
class NewCustomer extends Component {
  state = {};
  textFieldAlign = {
    marginTop: "20px",
    width: "25rem",
  };
  buttonAlign = {
    marginTop: "20px",
  };
  render() {
    return (
      <div className="new-customer">
        <div class="main-title">
          <h1 style={{ color: "black" }}>New Customer</h1>
        </div>
        <div class="main-form">
          <form name="event" style={{ verticalAlign: "middle", gap: "10px" }}>
            <TextField
              style={this.textFieldAlign}
              id="cname"
              label="Name"
              variant="filled"
            />
            <br />
            <TextField
              style={this.textFieldAlign}
              id="cnumber"
              label="Phone Number"
              variant="filled"
            />
            <br />
            <TextField
              style={this.textFieldAlign}
              id="clocation"
              label="Location"
              variant="filled"
            />
            <br />

            <Button style={this.buttonAlign} variant="contained">
              Contained
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewCustomer;
