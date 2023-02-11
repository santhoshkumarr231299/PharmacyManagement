import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Paper } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tooltip from "@mui/material/Tooltip";

export default function MedicinePage(props) {
  const [medicines, setMedicines] = useState([]);
  const updateMedicines = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/get-search-medicines", {
        searchWord: e.target.value,
      })
      .then((resp) => {
        setMedicines(resp.data);
      });
  };
  useEffect(() => {
    axios
      .post("http://localhost:3000/get-search-medicines", {
        searchWord: "",
      })
      .then((resp) => {
        setMedicines(resp.data);
      });
  }, []);
  console.log(medicines);
  return (
    <Paper
      elevation={3}
      style={{
        alignSelf: "center",
        margin: "auto",
        backgroundColor: "white",
        width: "1135px",
        height: "600px",
        color: "Black",
      }}
    >
      <div
        style={{
          width: "1055px",
          height: "560px",
          marginTop: "20px",
          margin: "auto",
          alignSelf: "center",
        }}
      >
        <div
          style={{
            width: "1095px",
            height: "100px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "4rem",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <OutlinedInput
              style={{ width: "80%", margin: "10px 0px 20px 0px" }}
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              placeholder="Search Medicines..."
              onChange={(e) => updateMedicines(e)}
            />
            <Tooltip title="Cart" arrow>
              <Badge badgeContent={4} color="primary">
                <ShoppingCartIcon
                  color="action"
                  onClick={(e) => console.log("clicked")}
                />
              </Badge>
            </Tooltip>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gridGap: "5px",
          }}
        >
          {medicines.map((data) => (
            <Paper
              elevation={3}
              style={{
                marginBottom: "10px",
                backgroundColor: "white",
                width: "150px",
                height: "150px",
                color: "Black",
              }}
            >
              <h6
                style={{
                  marginLeft: "10px",
                  textAlign: "left",
                  paddingTop: "10px",
                  marginBottom: "10px",
                }}
              >
                {data.medname}
              </h6>
            </Paper>
          ))}
        </div>
      </div>
    </Paper>
  );
}
