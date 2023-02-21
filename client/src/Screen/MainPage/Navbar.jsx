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
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "2rem",
          }}
        >
          <h5>Pharmacy Management</h5>
        </div>

        <div
          style={{
            marginLeft: "1100px",
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
