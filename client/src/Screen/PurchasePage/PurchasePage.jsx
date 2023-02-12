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
  const [cartItemSize, setCartItemSize] = useState(0);
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
      })
      .catch((err) => {
        console.log("something went wrong");
      });
    axios
      .get("http://localhost:3000/get-cart-items-count")
      .then((resp) => {
        setCartItemSize(resp.data.cartSize);
      })
      .catch((err) => {
        console.log("something went wrong");
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
              <Badge badgeContent={cartItemSize} color="primary">
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
  const [totalAmount, setTotalAmount] = useState(0);

  const updateTotAmt = () => {
    let amt = 0;
    medList.forEach((data) => {
      amt += data.quantity * data.price;
    });
    setMedList(amt);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/get-cart-items").then((resp) => {
      let tempList = [];
      let amt = 0;
      resp.data.forEach((data) => {
        amt += data.quantity * data.price;
        tempList.push({
          id: data.id,
          mid: data.mid,
          medName: data.medName,
          quantity: data.quantity,
          price: data.price,
        });
      });
      setTotalAmount(amt);
      setMedList(tempList);
    });
  }, []);
  const changeOption = (e) => {
    e.preventDefault();
    props.changeOption(0);
    console.log("change option clicked");
  };
  const handleDelete = (e, val) => {
    e.preventDefault();
    console.log(medList);
  };
  const updateQuantity = (e, id) => {
    axios
      .post("http://localhost:3000/update-cart-items", {
        newQuantity: e.target.value,
        mid: id,
      })
      .then((resp) => {
        let tempList = [];
        let amt = 0;
        resp.data.forEach((data) => {
          amt += data.quantity * data.price;
          tempList.push({
            id: data.id,
            mid: data.mid,
            medName: data.medName,
            quantity: data.quantity,
            price: data.price,
          });
        });
        setTotalAmount(amt);
        setMedList(tempList);
      });
  };
  const deleteItem = (e, id) => {
    axios
      .post("http://localhost:3000/delete-cart-items", {
        mid: id,
      })
      .then((resp) => {
        let tempList = [];
        let amt = 0;
        resp.data.forEach((data) => {
          amt += data.quantity * data.price;
          tempList.push({
            id: data.id,
            mid: data.mid,
            medName: data.medName,
            quantity: data.quantity,
            price: data.price,
          });
        });
        setTotalAmount(amt);
        setMedList(tempList);
      });
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
                  <th>Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>----</td>
                  <td>-------------------------</td>
                  <td>-------------------------</td>
                  <td>-----------------</td>
                  <td>----</td>
                </tr>
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
                        type="number"
                        onChange={(e) => updateQuantity(e, med.mid)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        defaultValue={med.quantity}
                      />
                    </td>
                    <td>{med.price}</td>
                    <td>
                      <div
                        onClick={(e) => handleDelete(e, med.id)}
                        key={med.mid}
                      >
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => deleteItem(e, med.mid)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>----</td>
                  <td>-------------------------</td>
                  <td>-------------------------</td>
                  <td>-----------------</td>
                  <td>----</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <th>Total</th>
                  <td>{totalAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Paper>
    </div>
  );
}
