import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { TextField, Button, Paper } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tooltip from "@mui/material/Tooltip";

export default function MainMedicinePage(props) {
  const [option, setOption] = useState(0);
  const changeOption = (value) => {
    setOption(value);
  };
  const getMedicinePage = () => {
    switch (option) {
      case 0:
        return <MedicinePage changeOption={changeOption} />;
      case 1:
        return (
          <CartPage username={props.username} changeOption={changeOption} />
        );
    }
  };
  return <div>{getMedicinePage()}</div>;
}

function MedicinePage(props) {
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
  const changeOption = (e) => {
    e.preventDefault();
    props.changeOption(1);
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
        minHeight: "600px",
        color: "Black",
      }}
    >
      <div
        style={{
          width: "1055px",
          minHeight: "560px",
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
            <Tooltip title="Cart" onClick={(e) => changeOption(e)} arrow>
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
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gridGap: "5px",
          }}
        >
          {medicines.map((data) => (
            <Paper
              elevation={3}
              style={{
                marginBottom: "10px",
                backgroundColor: "white",
                width: "230px",
                height: "300px",
                color: "Black",
              }}
            >
              <img
                src="https://www.gocnetworking.com/wp-content/uploads/2020/07/AdobeStock_351037752-scaled.jpeg"
                style={{
                  margin: "10px",
                  height: "150px",
                  width: "210px",
                }}
              />
              <table style={{ textAlign: "left", margin: "10px" }}>
                <tr>
                  <th>{data.mname}</th>
                </tr>
                <tr>
                  <td>Original Price </td>
                  <td>: {data.medMrp}</td>
                </tr>
                <tr>
                  <td>Discount Price </td>
                  <td>: {data.medRate}</td>
                </tr>
                <tr>
                  <td>Company </td>
                  <td>: {data.mcompany}</td>
                </tr>
              </table>
            </Paper>
          ))}
        </div>
      </div>
    </Paper>
  );
}

function CartPage(props) {
  const [medList, setMedList] = useState([]);
  medList.push(
    {
      id: 1,
      medName: "Name",
      quantity: 2,
    },
    {
      id: 2,
      medName: "Name2",
      quantity: 100,
    }
  );
  const changeOption = (e) => {
    e.preventDefault();
    props.changeOption(0);
    console.log("change option clicked");
  };
  const handleDelete = (e, val) => {
    e.preventDefault();
    medList.splice(val - 1);
    console.log(medList);
  };
  return (
    <div>
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
                paddingTop: "20px",
                display: "flex",
                gap: "4rem",
                alignItems: "center",
                margin: "auto",
                justifyContent: "center",
              }}
            >
              <h6>{props.username + "'s"} Cart</h6>
              <Button onClick={(e) => changeOption(e)} variant="contained">
                Back
              </Button>
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Medicine Name</th>
                  <th>Quantity</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {medList.map((med) => (
                  <tr>
                    <td>{med.id}</td>
                    <td align="left">{med.medName}</td>
                    <td>
                      <TextField
                        style={{
                          margin: 0,
                          padding: 0,
                          width: "80px",
                        }}
                        id="filled-number"
                        label=""
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        defaultValue={med.quantity}
                      />
                    </td>
                    <td>
                      <div
                        onClick={(e) => handleDelete(e, med.id)}
                        key={med.id}
                      >
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Paper>
    </div>
  );
}
