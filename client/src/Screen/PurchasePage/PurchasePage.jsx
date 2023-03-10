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
import Cards from "./Cards";
import {
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";

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
  const updateCartCount = () => {
    axios
      .get("http://localhost:3000/get-cart-items-count")
      .then((resp) => {
        setCartItemSize(resp.data.cartSize);
      })
      .catch((err) => {
        console.log("something went wrong");
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
    updateCartCount();
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
              style={{
                width: "80%",
                margin: "25px 0px 20px 0px",
                zIndex: "0",
              }}
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
              <Badge badgeContent={cartItemSize} color="warning">
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
            <Cards
              name={data.mname}
              content={data.mcompany}
              mrp={data.medMrp}
              rate={data.medRate}
              updateCartCount={updateCartCount}
              img={
                "https://images.unsplash.com/photo-1617881770125-6fb0d039ecde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fG1lZGljaW5lfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              }
            />
          ))}
        </div>
      </div>
      <div style={{ padding: "7px" }}></div>
    </Paper>
  );
}

function CartPage(props) {
  const [medList, setMedList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [mouseHover, setMouseHover] = useState(false);

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
              paddingRight: 43,
            }}
          >
            <div
              className="float-end"
              style={{
                paddingTop: "20px",
                display: "flex",
                gap: "4rem",
                alignItems: "center",
                margin: "auto",
                justifyContent: "center",
              }}
            >
              <span className="h3">
                {props.username[0].toUpperCase() +
                  props.username.substr(1) +
                  "'s"}{" "}
                Cart
              </span>
              <Button
                onClick={(e) => changeOption(e)}
                variant="contained"
                style={{ backgroundColor: "purple" }}
              >
                Back
              </Button>
            </div>
          </div>
          <div>
            {medList.map((med) => (
              <div>
                <MDBCard
                  style={{ backgroundColor: "#fcfafa" }}
                  className="mb-2"
                >
                  <MDBCardBody className="p-1">
                    <MDBRow className="align-items-center">
                      <MDBCol md="1">
                        <MDBCardImage
                          style={{ marginLeft: "20px" }}
                          fluid
                          src="https://images.unsplash.com/photo-1617881770125-6fb0d039ecde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fG1lZGljaW5lfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                          alt="Generic placeholder image"
                        />
                      </MDBCol>
                      <MDBCol md="2" className="d-flex justify-content-center">
                        <div>
                          <p className="lead fw-normal mb-0">{med.id}</p>
                        </div>
                      </MDBCol>
                      <MDBCol md="2" className="d-flex justify-content-center">
                        <div>
                          <p className="lead fw-normal mb-0">
                            <MDBIcon
                              fas
                              icon="circle me-2"
                              style={{ color: "#fdd8d2" }}
                            />
                            {med.medName}
                          </p>
                        </div>
                      </MDBCol>
                      <MDBCol md="2" className="d-flex justify-content-center">
                        <div>
                          <p className="lead fw-normal mb-0">
                            <TextField
                              style={{
                                margin: 10,
                                padding: 0,
                                width: "80px",
                              }}
                              label="Quantity"
                              id="filled-number"
                              type="number"
                              onChange={(e) => updateQuantity(e, med.mid)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              defaultValue={med.quantity}
                            />
                          </p>
                        </div>
                      </MDBCol>
                      <MDBCol md="2" className="d-flex justify-content-center">
                        <div>
                          <p className="lead fw-normal mb-0">??? {med.price}</p>
                        </div>
                      </MDBCol>
                      <MDBCol md="2" className="d-flex justify-content-center">
                        <div>
                          <p className="lead fw-normal mb-0">
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
                          </p>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </div>
            ))}
            <MDBCard className="mb-5">
              <MDBCardBody
                className="p-4"
                style={{ backgroundColor: "#fcfafa" }}
              >
                <div className="float-end">
                  <p className="mb-0 me-5 d-flex align-items-center">
                    <span className="small text-muted me-2">Order total:</span>
                    <span className="lead fw-normal">???{totalAmount}</span>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>
          <div>
            <MDBCard className="mb-4" style={{ width: "100%" }}>
              <MDBCardBody
                className="p-2 d-flex flex-row"
                style={{ alignItems: "center", backgroundColor: "#fcfafa" }}
              >
                <MDBInput
                  style={{ height: "40px" }}
                  placeholder="Discound code"
                  wrapperClass="flex-fill"
                />
                <Button
                  onClick={(e) => console.log("proceed to pay")}
                  variant="outlined"
                  style={{
                    height: "40px",
                    color: mouseHover ? "white" : "purple",
                    borderColor: "purple",
                    backgroundColor: mouseHover ? "purple" : "",
                    margin: "10px",
                  }}
                  onMouseEnter={() => setMouseHover(true)}
                  onMouseLeave={() => setMouseHover(false)}
                >
                  Apply
                </Button>
              </MDBCardBody>
            </MDBCard>
          </div>
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={(e) => console.log("proceed to pay")}
              variant="contained"
              style={{ backgroundColor: "purple", marginBottom: "15px" }}
            >
              PROCEED TO PAY
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}
