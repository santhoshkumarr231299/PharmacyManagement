import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Box } from "@mui/material";

export default function CustomerPageManager() {
  const [isAddMedClicked, setAddMedClicked] = useState(false);
  const changeStatus = (val) => {
    setAddMedClicked(val);
  };
  const getMedPage = () => {
    switch (isAddMedClicked) {
      case true:
        return <AddCustomerPage />;
      default:
        return <CustomerPage addMedStatus={changeStatus} />;
    }
  };
  return <>{getMedPage()}</>;
}

function CustomerPage(props) {
  const [medicines, setCustomers] = useState([]);
  const [dataGridRows, setDataGridRows] = useState([]);
  useEffect(() => {
    let temp = [];
    let counter = 0;
    axios.get("http://localhost:3000/get-medicines").then((resp) => {
      setCustomers(resp.data);
      resp.data.forEach((da) => {
        temp.push({ id: ++counter, mname: da.mname, mcompany: da.mcompany });
      });
      setDataGridRows(temp);
    });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "mname", headerName: "Customer Name", width: 130 },
    { field: "mcompany", headerName: "Company Name", width: 130 },
  ];
  console.log(medicines);
  return (
    <Box
      boxShadow={2}
      style={{
        alignSelf: "center",
        margin: "auto",
        backgroundColor: "white",
        width: "1135px",
        height: "600px",
        color: "Black",
        boxShadow: "10px",
      }}
    >
      <Button
        style={{
          marginBottom: "20px",
          marginTop: "10px",
          position: "",
          right: 50,
        }}
        variant="contained"
        onClick={() => props.addMedStatus(true)}
      >
        Add Customer
      </Button>
      <DataGrid
        style={{
          alignSelf: "center",
          width: "1000px",
          height: "500px",
          margin: "auto",
        }}
        rows={dataGridRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
}

function AddCustomerPage(props) {
  const textFieldAlign = {
    marginTop: "20px",
    width: "25rem",
  };
  const buttonAlign = {
    marginTop: "20px",
  };
  return (
    <div className="new-customer">
      <Box
        boxShadow={2}
        style={{
          marginBottom: "20px",
          backgroundColor: "white",
          width: "1135px",
          color: "Black",
          boxShadow: "10px",
        }}
      >
        <div class="main-title">
          <h2 style={{ color: "black", paddingTop: "20px" }}>New Customer</h2>
        </div>
        <div class="main-form">
          <form name="event" style={{ verticalAlign: "middle", gap: "10px" }}>
            <TextField
              style={textFieldAlign}
              id="medname"
              label="Name"
              variant="filled"
            />
            <br />
            <TextField
              style={textFieldAlign}
              id="medcompany"
              label="Company"
              variant="filled"
            />
            <br />

            <Button
              style={{ marginBottom: "20px", marginTop: "20px" }}
              variant="contained"
            >
              Add Customer
            </Button>
          </form>
        </div>
      </Box>
    </div>
  );
}
