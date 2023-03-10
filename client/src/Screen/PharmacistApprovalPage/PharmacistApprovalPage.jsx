import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Paper, LinearProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function PharmacistPage(props) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const [orderedItems, setOrderedItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataGridRows, setDataGridRows] = useState([]);

  const handleClose = () => {
    setMessage("");
    setSeverity("");
    setOpen(false);
  };

  const approveItems = (e) => {
    e.preventDefault();
    selectedItems.forEach((item) => {
      let name = dataGridRows.filter((ele) => ele.id === item)[0].name;
      axios
        .post("http://localhost:3000/approve-order", {
          username: name,
        })
        .then((resp) => {
          setOpen(true);
          setSeverity(resp.data.status);
          setMessage(resp.data.message);
          if (resp.data.status === "success") {
            fetchData();
          }
        })
        .catch((err) => {
          setOpen(true);
          setSeverity("error");
          setMessage("Something went wrong");
          return;
        });
    });
  };

  function fetchData() {
    setIsLoading(true);
    let temp = [];
    let counter = 0;
    axios
      .get("http://localhost:3000/get-ordered-items-for-approval")
      .then((resp) => {
        setOrderedItems(resp.data);
        resp.data.forEach((data) => {
          temp.push({
            id: ++counter,
            name: data.username,
            // msg: data.msg,
          });
        });
        setIsLoading(false);
        setDataGridRows(temp);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 180 },
    // { field: "msg", headerName: "Message", width: 130 },
  ];

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div>
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
        <div
          style={{
            alignItems: "center",
          }}
        >
          <Button
            style={{
              marginBottom: "20px",
              marginTop: "20px",
              marginRight: "20px",
              right: 65,
              backgroundColor: "green",
            }}
            variant="contained"
            onClick={(e) => approveItems(e)}
          >
            {selectedItems && selectedItems.length <= 1
              ? "Approve"
              : "Approve All"}
          </Button>
          <Button
            style={{
              marginBottom: "20px",
              marginTop: "20px",
              right: 65,
              backgroundColor: "red",
            }}
            variant="contained"
            onClick={() => console.log("Declined : ", selectedItems)}
          >
            {selectedItems && selectedItems.length <= 1
              ? "Decline"
              : "Decline All"}
          </Button>
        </div>
        <DataGrid
          loading={isLoading}
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
          onSelectionModelChange={(item) => setSelectedItems(item)}
        />
      </Paper>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
