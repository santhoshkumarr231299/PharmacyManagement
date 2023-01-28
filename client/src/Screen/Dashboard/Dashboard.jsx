import React from "react";
import { Box } from "@mui/material";
// import Barchart from "./Chart";
function boxes() {
  const list = [
    { fieldName: "Users", value: "" },
    { fieldName: "Medicines", value: "" },
    { fieldName: "Customers", value: "" },
    { fieldName: "Delivery Men", value: "" },
    { fieldName: "Pharmacists", value: "" },
  ];

  let element = [];
  list.map((data) =>
    element.push(
      <Box
        boxShadow={2}
        style={{
          marginBottom: "20px",
          backgroundColor: "white",
          width: "200px",
          height: "200px",
          color: "Black",
          boxShadow: "10px",
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
      </Box>
    )
  );
  return element;
}
export default function Dashboard() {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "40%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridGap: "12px",
        }}
        className="dashboard"
      >
        {boxes()}
      </div>
      <div>
        <Box
          boxShadow={2}
          style={{
            marginRight: "20px",
            backgroundColor: "white",
            width: "1130px",
            height: "380px",
            color: "Black",
            boxShadow: "10px",
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
            Chart
          </h5>
          {/* <Barchart /> */}
        </Box>
      </div>
    </div>
  );
}
