import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Paper } from "@mui/material";

function SalesReportPageManager() {
  const [isAddMedClicked, setAddMedClicked] = useState(false);
  const changeStatus = (val) => {
    setAddMedClicked(val);
  };
  const getMedPage = () => {
    switch (isAddMedClicked) {
      case true:
        return <AddSalesReportPage />;
      default:
        return <SalesReportPage addMedStatus={changeStatus} />;
    }
  };
  return <>{getMedPage()}</>;
}

export default function SalesReportPage(props) {
  const [medicines, setSalesReports] = useState([]);
  const [dataGridRows, setDataGridRows] = useState([]);
  useEffect(() => {
    let temp = [];
    let counter = 0;
    // axios.get("http://localhost:3000/get-medicines").then((resp) => {
    //   setSalesReports(resp.data);
    //   resp.data.forEach((da) => {
    //     temp.push({ id: ++counter, mname: da.mname, mcompany: da.mcompany });
    //   });
    //   setDataGridRows(temp);
    // });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Sales Report Title", width: 130 },
    { field: "type", headerName: "Sales Report Type", width: 130 },
    { field: "date", headerName: "Date", width: 70 },
    { field: "reporter", headerName: "Sales Reported By", width: 130 },
  ];
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
        Add Sales Report
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

function AddSalesReportPage(props) {
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
          <h2 style={{ color: "black", paddingTop: "20px" }}>
            New SalesReport
          </h2>
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

            {/* <Button
              style={{ marginBottom: "20px", marginTop: "20px" }}
              variant="contained"
            >
              Add Sales Report
            </Button> */}
          </form>
        </div>
      </Paper>
    </div>
  );
}
