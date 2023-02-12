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
  const [isAddMedClicked, setAddMedClicked] = useState(false);
  const changeStatus = (val) => {
    setAddMedClicked(val);
  };
  const getMedPage = () => {
    switch (isAddMedClicked) {
      case true:
        return <AddMedicinePage addMedStatus={changeStatus} />;
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
    let counter = 1;
    axios.get("http://localhost:3000/get-medicines").then((resp) => {
      setMedicines(resp.data);
      resp.data.forEach((med) => {
        temp.push({
          id: counter++,
          mname: med.mname,
          mcompany: med.mcompany,
          quantity: med.quantity,
          dateadded: med.dateAdded,
          expirydate: med.expiryDate,
          mrp: med.medMrp,
          rate: med.medRate,
          status: med.status,
          addedby: med.addedBy,
        });
      });

      setDataGridRows(temp);
    });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "mname", headerName: "Medicine Name", width: 130 },
    { field: "mcompany", headerName: "Company Name", width: 130 },
    { field: "quantity", headerName: "Quantity", width: 70 },
    { field: "dateadded", headerName: "Date Added", width: 130 },
    { field: "expirydate", headerName: "Expiry Date", width: 130 },
    { field: "mrp", headerName: "MRP", width: 70 },
    { field: "rate", headerName: "Rate", width: 70 },
    { field: "addedby", headerName: "Added By", width: 100 },
    { field: "status", headerName: "Status", width: 85 },
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
        Add Medicine
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
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const [medName, setMedName] = useState("");
  const [medCompany, setMedCompany] = useState("");
  const [medExpiryDate, setMedExpiryDate] = useState("");
  const [medQuantity, setMedQuantity] = useState("");
  const [medMrp, setMedMrp] = useState("");
  const [medRate, setMedRate] = useState("");
  const [medStatus, setMedStatus] = useState("");

  const updateValues = (e, fieldId) => {
    switch (fieldId) {
      case 1:
        setMedName(e.target.value);
        break;
      case 2:
        setMedCompany(e.target.value);
        break;
      case 3:
        setMedMrp(e.target.value);
        break;
      case 4:
        setMedRate(e.target.value);
        break;
      case 5:
        setMedQuantity(e.target.value);
        break;
      case 6:
        setMedExpiryDate(e.target.value);
        break;
      case 7:
        setMedStatus(e.target.value);
        break;
      default:
        console.log("Not Valid");
        break;
    }
  };

  const medicineFields = [
    {
      id: 1,
      type: "text",
      fieldName: "medname",
      labelName: "Medicine Name",
      status: "active",
    },
    {
      id: 2,
      type: "text",
      fieldName: "medcompany",
      labelName: "Medicine Company",
      status: "active",
    },
    {
      id: 3,
      type: "number",
      fieldName: "medmrp",
      labelName: "MRP",
      status: "active",
    },
    {
      id: 4,
      type: "number",
      fieldName: "medrate",
      labelName: "Rate",
      status: "active",
    },
    {
      id: 5,
      type: "number",
      fieldName: "medquantity",
      labelName: "Quantity",
      status: "active",
    },
    {
      id: 6,
      type: "date",
      fieldName: "medexpirydate",
      labelName: "Expiry Date",
      status: "active",
    },
    {
      id: 7,
      type: "select",
      select: ["ACTIVE", "INACTIVE"],
      fieldName: "medstatus",
      labelName: "Status",
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
      .post("http://localhost:3000/post-medicine", {
        medName: medName,
        medCompany: medCompany,
        medMrp: medMrp,
        medRate: medRate,
        medQuantity: medQuantity,
        medExpiryDate: medExpiryDate,
        medStatus: medStatus,
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
            marginTop: "10px",
            position: "",
            right: 50,
          }}
          variant="contained"
          onClick={() => props.addMedStatus(false)}
        >
          Back
        </Button>
        <div class="main-title">
          <h2 style={{ color: "black", paddingTop: "20px" }}>New Medicine</h2>
        </div>
        <div class="main-form">
          <form name="event" style={{ verticalAlign: "middle", gap: "10px" }}>
            {medicineFields.map((med) => (
              <div>
                {(med.type === "text" ||
                  med.type === "number" ||
                  med.type === "date") && (
                  <TextField
                    key={med.id}
                    style={{ margin: "10px", width: "20rem" }}
                    type={med.type}
                    label={med.labelName}
                    disabled={med.status === "disabled"}
                    variant="outlined"
                    onChange={(e) => updateValues(e, med.id)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                )}
                {med.type === "select" && (
                  <FormControl style={{ margin: "10px", width: "20rem" }}>
                    <InputLabel id="demo-simple-select-label">
                      {med.labelName}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={med.labelName}
                      onChange={(e) => updateValues(e, med.id)}
                      required
                    >
                      {med.select.map((selectValue) => (
                        <MenuItem value={selectValue}>{selectValue}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <br />
              </div>
            ))}

            <Button
              style={{ marginBottom: "20px", marginTop: "20px" }}
              variant="contained"
              onClick={(e) => submitReport(e)}
            >
              Add Medicine
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
