import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Paper } from "@mui/material";

export default function MedicinePageManager() {
  const [isAddMedClicked, setAddMedClicked] = useState(false);
  const changeStatus = (val) => {
    setAddMedClicked(val);
  };
  const getMedPage = () => {
    switch (isAddMedClicked) {
      case true:
        return <AddMedicinePage />;
      default:
        return <MedicinePage addMedStatus={changeStatus} />;
    }
  };
  return <>{getMedPage()}</>;
}

function MedicinePage(props) {
  const [medicines, setMedicines] = useState([]);
  const [dataGridRows, setDataGridRows] = useState([]);
  useEffect(() => {
    let temp = [];
    let counter = 0;
    axios.get("http://localhost:3000/get-medicines").then((resp) => {
      setMedicines(resp.data);
      resp.data.forEach((da) => {
        temp.push({ id: ++counter, mname: da.mname, mcompany: da.mcompany });
      });
      setDataGridRows(temp);
    });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "mname", headerName: "Pharmacist Name", width: 130 },
    { field: "mcompany", headerName: "Company Name", width: 130 },
  ];
  console.log(medicines);
  return (
    <Paper
      elevation={3}
      style={{
        textAlign: "right",
        alignSelf: "center",
        margin: "auto",
        backgroundColor: "white",
        width: "1135px",
        height: "600px",
        color: "Black",
      }}
    >
      <Button
        style={{
          marginBottom: "20px",
          marginTop: "20px",
          right: 65,
          backgroundColor: "purple",
        }}
        variant="contained"
        onClick={() => props.addMedStatus(true)}
      >
        Add Pharmacist
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
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Paper>
  );
}

function AddMedicinePage(props) {
  const textFieldAlign = {
    marginTop: "20px",
    width: "25rem",
  };
  return (
    <div className="new-customer">
      <Paper
        elevation={3}
        style={{
          marginBottom: "20px",
          backgroundColor: "white",
          width: "1135px",
          color: "Black",
        }}
      >
        <div class="main-title">
          <h2 style={{ color: "black", paddingTop: "20px" }}>New Pharmacist</h2>
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
              style={{
                marginBottom: "20px",
                marginTop: "20px",
                backgroundColor: "purple",
              }}
              variant="contained"
            >
              Add Pharmacist
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}
