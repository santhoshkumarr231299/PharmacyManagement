import axios from "axios";
import React, { useState } from "react";

export default function LogoutPage() {
  const logoutUser = (e) => {
    e.preventDefault();
    axios.get("http://localhost:3000/logout").then((resp) => {
      window.location.reload(false);
    });
  };
  return (
    <div class="logout-page">
      <button onClick={(e) => logoutUser(e)}>Logout</button>
    </div>
  );
}
