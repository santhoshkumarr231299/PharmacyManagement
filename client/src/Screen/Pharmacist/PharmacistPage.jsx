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

export default function MedicinePageManager() {
  const [pageStatus, setPageStatus] = useState(false);
  const changeStatus = (val) => {
    setPageStatus(val);
  };
  const getPage = () => {
    switch (pageStatus) {
      case true:
        return <AddPharmacistPage addPharmacistStatus={changeStatus} />;
      default:
        return <PharmacistPage addPharmacistStatus={changeStatus} />;
    }
  };
  return <>{getPage()}</>;
}

function PharmacistPage(props) {
  const [pharmacists, setPharmacists] = useState([]);
  const [dataGridRows, setDataGridRows] = useState([]);
  useEffect(() => {
    let temp = [];
    let counter = 0;
    axios.get("http://localhost:3000/get-pharmacists-details").then((resp) => {
      setPharmacists(resp.data);
      resp.data.forEach((data) => {
        temp.push({
          id: ++counter,
          name: data.name,
          email: data.email,
          mobilenumber: data.mobileNumber,
          address: data.address,
          aadhar: data.aadhar,
        });
      });
      setDataGridRows(temp);
    });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Pharmacist Name", width: 180 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "mobilenumber", headerName: "Mobile Number", width: 130 },
    { field: "address", headerName: "Address", width: 300 },
    { field: "aadhar", headerName: "Aadhar", width: 130 },
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
        onClick={() => props.addPharmacistStatus(true)}
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

function AddPharmacistPage(props) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [aadhar, setAadhar] = useState("");

  const updateValues = (e, fieldId) => {
    switch (fieldId) {
      case 1:
        setName(e.target.value);
        break;
      case 2:
        setEmail(e.target.value);
        break;
      case 3:
        setMobileNumber(e.target.value);
        break;
      case 4:
        setAddress(e.target.value);
        break;
      case 5:
        setAadhar(e.target.value);
        break;
      default:
        console.log("Not Valid");
        break;
    }
  };

  const pharmacistFields = [
    {
      id: 1,
      type: "text",
      fieldName: "name",
      labelName: "Pharmacist Name",
      status: "active",
    },
    {
      id: 2,
      type: "email",
      fieldName: "email",
      labelName: "Email",
      status: "active",
    },
    {
      id: 3,
      type: "number",
      fieldName: "mobilenumber",
      labelName: "Mobile Number",
      status: "active",
    },
    {
      id: 4,
      type: "text",
      fieldName: "address",
      labelName: "Address",
      status: "active",
    },
    {
      id: 5,
      type: "number",
      fieldName: "aadhar",
      labelName: "Aadhar Number",
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
      .post("http://localhost:3000/post-pharmacist-details", {
        name: name,
        email: email,
        mobileNumber: mobileNumber,
        address: address,
        aadhar: aadhar,
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
          onClick={() => props.addPharmacistStatus(false)}
        >
          Back
        </Button>
        <div class="main-title">
          <h2 style={{ color: "black", paddingTop: "20px" }}>New Pharmacist</h2>
        </div>
        <div class="main-form">
          <form name="event" style={{ verticalAlign: "middle", gap: "10px" }}>
            {pharmacistFields.map((pharmacist) => (
              <div>
                {(pharmacist.type === "text" ||
                  pharmacist.type === "number" ||
                  pharmacist.type === "email" ||
                  pharmacist.type === "date") && (
                  <TextField
                    key={pharmacist.id}
                    style={{ margin: "10px", width: "20rem" }}
                    type={pharmacist.type}
                    label={pharmacist.labelName}
                    disabled={pharmacist.status === "disabled"}
                    variant="outlined"
                    onChange={(e) => updateValues(e, pharmacist.id)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                )}
                {pharmacist.type === "select" && (
                  <FormControl style={{ margin: "10px", width: "20rem" }}>
                    <InputLabel id="demo-simple-select-label">
                      {pharmacist.labelName}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={pharmacist.labelName}
                      onChange={(e) => updateValues(e, pharmacist.id)}
                      required
                    >
                      {pharmacist.select.map((selectValue) => (
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
              Add Pharmacist
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
