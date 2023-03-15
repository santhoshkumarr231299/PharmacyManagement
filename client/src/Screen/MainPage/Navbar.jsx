import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { purple } from "@mui/material/colors";
import { Settings, Logout } from "@mui/icons-material";

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
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: purple[500] }}>
              {props.username[0].toUpperCase()}
            </Avatar>
            Hello{" "}
            {props.username[0].toUpperCase() + props.username.substring(1)}
          </div>
          <div onClick={(e) => props.changeOption(e, 12)}>
            <Settings className="icon-top" />
          </div>
          <div onClick={(e) => props.changeOption(e, 13)}>
            <Logout className="icon-top" />
          </div>
        </div>
      </a>
    </nav>
  );
}
