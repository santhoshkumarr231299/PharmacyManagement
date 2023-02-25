import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Paper } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function InvoicePage() {
  const [pageStatus, setPageStatus] = useState(false);
  const changeStatus = (val) => {
    setPageStatus(val);
  };
  const getPage = () => {
    switch (pageStatus) {
      case true:
        return <AddInvoicePage addInvoiceStatus={changeStatus} />;
      default:
        return <InvoiceReportPage addInvoiceStatus={changeStatus} />;
    }
  };
  return <>{getPage()}</>;
}

function InvoiceReportPage(props) {
  const [invoice, setInvoice] = useState([]);
  const [dataGridRows, setDataGridRows] = useState([]);
  useEffect(() => {
    let temp = [];
    let counter = 0;
    axios.get("http://localhost:3000/get-invoices").then((resp) => {
      setInvoice(resp.data);
      resp.data.forEach((da) => {
        temp.push({
          id: ++counter,
          username: da.username,
          pharmname: da.pharmName,
          branch: da.branch,
          quantity: da.quantity,
          amount: da.amount,
          date: da.invoiceDate,
        });
      });
      console.log("invoices  : ", temp);
      setDataGridRows(temp);
    });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", width: 100 },
    { field: "pharmname", headerName: "Pharm Name", width: 180 },
    { field: "branch", headerName: "Branch", width: 130 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "amount", headerName: "Amount", width: 130 },
    { field: "date", headerName: "date", width: 160 },
  ];
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
        onClick={() => props.addInvoiceStatus(true)}
      >
        Add Invoice
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

function AddInvoicePage(props) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [pharmName, setPharmName] = useState("");
  const [branch, setBranch] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");

  const updateValues = (e, fieldId) => {
    switch (fieldId) {
      case 1:
        setPharmName(e.target.value);
        break;
      case 2:
        setBranch(e.target.value);
        break;
      case 3:
        setQuantity(e.target.value);
        break;
      case 4:
        setAmount(e.target.value);
        break;
      default:
        console.log("Not Valid");
        break;
    }
  };

  const Fields = [
    {
      id: 1,
      type: "text",
      fieldName: "pharmname",
      labelName: "Parm Name",
      status: "active",
    },
    {
      id: 2,
      type: "number",
      fieldName: "branch",
      labelName: "Branch",
      status: "active",
    },
    {
      id: 3,
      type: "number",
      fieldName: "quantity",
      labelName: "Quantity",
      status: "active",
    },
    {
      id: 4,
      type: "number",
      fieldName: "amount",
      labelName: "Amount in Rs.",
      status: "active",
    },
  ];
  const handleClose = () => {
    setMessage("");
    setSeverity("");
    setOpen(false);
  };
  const submitReport = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/post-invoice", {
        pharmName: pharmName,
        branch: branch,
        quantity: quantity,
        amount: amount,
      })
      .then((resp) => {
        setOpen(true);
        setSeverity(resp.data.status);
        setMessage(resp.data.message);
      })
      .catch((err) => {
        setOpen(true);
        setSeverity("error");
        setMessage("Something went wrong");
        return;
      });
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <div className="new-customer">
      <Paper
        elevation={3}
        style={{
          textAlign: "center",
          marginBottom: "20px",
          backgroundColor: "white",
          width: "1135px",
          minHeight: "600px",
          color: "Black",
        }}
      >
        <Button
          style={{
            marginBottom: "10px",
            marginTop: "20px",
            right: -450,
            backgroundColor: "purple",
          }}
          variant="contained"
          onClick={() => props.addInvoiceStatus(false)}
        >
          Back
        </Button>
        <div class="main-title">
          <h2 style={{ color: "black", paddingTop: "20px" }}>New Invoice</h2>
        </div>
        <div class="main-form">
          <form name="event" style={{ verticalAlign: "middle", gap: "10px" }}>
            {Fields.map((field) => (
              <div>
                {(field.type === "text" ||
                  field.type === "number" ||
                  field.type === "email" ||
                  field.type === "date") && (
                  <TextField
                    key={field.id}
                    style={{ margin: "10px", width: "20rem" }}
                    type={field.type}
                    label={field.labelName}
                    disabled={field.status === "disabled"}
                    variant="outlined"
                    onChange={(e) => updateValues(e, field.id)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                )}
                {field.type === "select" && (
                  <FormControl style={{ margin: "10px", width: "20rem" }}>
                    <InputLabel id="demo-simple-select-label">
                      {field.labelName}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={field.labelName}
                      onChange={(e) => updateValues(e, field.id)}
                      required
                    >
                      {field.select.map((selectValue) => (
                        <MenuItem value={selectValue}>{selectValue}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <br />
              </div>
            ))}

            <Button
              style={{
                marginBottom: "20px",
                marginTop: "20px",
                backgroundColor: "purple",
              }}
              variant="contained"
              onClick={(e) => submitReport(e)}
            >
              Add Invoice
            </Button>
          </form>
        </div>
      </Paper>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
