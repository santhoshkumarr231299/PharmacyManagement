import { Paper } from "@mui/material";
import React from "react";
import { Card } from "react-bootstrap";
// import Chart from "./Chart";
function boxes() {
  const list = [
    { fieldName: "Users", value: "", bg: "primary" },
    { fieldName: "Medicines", value: "", bg: "info" },
    { fieldName: "Customers", value: "", bg: "warning" },
    { fieldName: "Delivery Men", value: "", bg: "danger" },
    { fieldName: "Pharmacists", value: "", bg: "success" },
  ];

  let element = [];
  list.map((data) =>
    element.push(
      <div class="col-lg-3 col-sm-6">
        <Card
          className={
            "card bg-" +
            data.bg +
            " text-high-emphasis-inverse p-3 mb-2 text-white"
          }
          elevation={3}
          style={{
            opacity: "80%",
            marginLeft: "20px",
            marginTop: "20px",
            textAlign: "center",
            width: "180px",
            height: "180px",
          }}
        >
          <h5
            style={{
              marginLeft: "10px",
              textAlign: "left",
              paddingTop: "10px",
              marginBottom: "10px",
            }}
          >
            {data.fieldName}
          </h5>
        </Card>
      </div>
    )
  );
  return element;
}
function Dashboard() {
  return (
    <Paper
      elevation={3}
      style={{
        justifyContent: "center",
        margin: "auto",
        backgroundColor: "white",
        width: "1135px",
        height: "640px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "38%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridGap: "12px",
        }}
        className="dashboard"
      >
        {boxes()}
      </div>
      <div>
        <Paper
          elevation={3}
          style={{
            marginLeft: "20px",
            backgroundColor: "white",
            width: "1100px",
            height: "380px",
            color: "Black",
            // boxShadow: "10px",
          }}
        >
          {/* <Chart /> */}
        </Paper>
      </div>
    </Paper>
  );
}

export default Dashboard;
