import { Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
// import Chart from "./Chart";
function boxes(list) {
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
          <h1
            style={{
              marginLeft: "10px",
              textAlign: "left",
              paddingTop: "20px",
              marginBottom: "10px",
            }}
          >
            {data.value}
          </h1>
        </Card>
      </div>
    )
  );
  return element;
}
function Dashboard() {
  const [data, setData] = useState([]);
  const list = [
    { fieldName: "Managers", value: 0, bg: "primary" },
    { fieldName: "Pharmacists", value: 0, bg: "info" },
    { fieldName: "Delivery Men", value: 0, bg: "warning" },
    { fieldName: "Medicines", value: 0, bg: "danger" },
    { fieldName: "Sales", value: 0, bg: "success" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/get-dashboard-details")
      .then((resp) => {
        console.log(resp.data);
        list[0].value = resp.data.managersCount;
        list[1].value = resp.data.pharmacistsCount;
        list[2].value = resp.data.DeliveryMenCount;
        list[3].value = resp.data.medicinesCount;
        setData(list);
      })
      .catch((err) => console.log("error", err));
  }, []);
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
        {boxes(data)}
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
