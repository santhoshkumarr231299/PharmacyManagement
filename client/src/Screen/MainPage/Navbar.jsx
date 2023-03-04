import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { purple } from "@mui/material/colors";

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-light bg-light">
      <a
        style={{
          display: "flex",
          gap: "2rem",
          position: "flex-end",
          alignItems: "center",
          marginLeft: "15px",
        }}
      >
        <div
          className="main-title"
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <div>
            <img
              src="https://www.productions-plus.com/wp-content/uploads/2017/06/logo-icon.png"
              style={{
                maxHeight: "30px",
                maxWidth: "30px",
                margin: 0,
                padding: 0,
              }}
            />
          </div>
          <div>
            <h5 style={{ margin: 0, padding: 0 }}>PharmSimple</h5>
          </div>
        </div>

        <div
          style={{
            marginLeft: "1050px",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: purple[500] }}>
            {props.username[0].toUpperCase()}
          </Avatar>
          Hello {props.username[0].toUpperCase() + props.username.substring(1)}
          <div></div>
        </div>
      </a>
    </nav>
  );
}
