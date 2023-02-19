import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

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
        backgroundColor: "white",
        width: "1135px",
        height: "600px",
        color: "Black",
      }}
    >
      <div>
        <DataGrid
          style={{
            justifyContent: "center",
            verticalAlign: "center",
            width: "1000px",
            height: "500px",
            margin: "auto",
          }}
          rows={dataGridRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Paper>
  );
}
