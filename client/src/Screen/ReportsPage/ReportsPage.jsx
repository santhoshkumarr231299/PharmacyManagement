import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Paper } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function ReportPageManager() {
  const [isAddMedClicked, setAddMedClicked] = useState(false);
  const changeStatus = (val) => {
    setAddMedClicked(val);
  };
  const getMedPage = () => {
    switch (isAddMedClicked) {
      case true:
        return <AddReportPage addMedStatus={changeStatus} />;
      default:
        return <ReportPage addMedStatus={changeStatus} />;
    }
  };
  return <>{getMedPage()}</>;
}

function ReportPage(props) {
  const [reports, setReports] = useState([]);
  const [dataGridRows, setDataGridRows] = useState([]);
  useEffect(() => {
    let temp = [];
    axios.get("http://localhost:3000/get-reports").then((resp) => {
      setReports(resp.data);
      console.log(resp.data);
      resp.data.forEach((tdata) => {
        temp.push({
          id: tdata.id,
          title: tdata.reportTitle,
          subject: tdata.reportSubject,
          description: tdata.reportDesc,
          date: tdata.reportDate.substring(0, 10),
          role: tdata.role,
          reporter: tdata.reportedBy,
        });
      });
      setDataGridRows(temp);
    });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "subject", headerName: "Subject", width: 130 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "date", headerName: "Date", width: 100 },
    { field: "reporter", headerName: "Reported By", width: 130 },
  ];

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
        Add Report
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
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Paper>
  );
}

function AddReportPage(props) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");

  const reportFields = [
    { id: 1, fieldName: "title", labelName: "Report Title", status: "active" },
    {
      id: 2,
      fieldName: "subject",
      labelName: "Report subject",
      status: "active",
    },
    {
      id: 3,
      fieldName: "desc",
      labelName: "Report Description",
      status: "active",
    },
  ];

  const handleClose = () => {
    setMessage("");
    setSeverity("");
    setOpen(false);
  };

  const updateValues = (e, fieldId) => {
    switch (fieldId) {
      case 1:
        setTitle(e.target.value);
        break;
      case 2:
        setSubject(e.target.value);
        break;
      case 3:
        setDesc(e.target.value);
        break;
      default:
        console.log("Not Valid");
    }
  };
  const submitReport = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/post-report", {
        reportTitle: title,
        reportSubject: subject,
        reportDesc: desc,
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
    document.getElementById("title").innerText = "";
    document.getElementById("subject").innerText = "";
    document.getElementById("desc").innerText = "";
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
            marginBottom: "20px",
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
          <h2 style={{ color: "black", paddingTop: "20px" }}>New Report</h2>
        </div>
        <div class="main-form">
          <form name="event" style={{ verticalAlign: "middle", gap: "10px" }}>
            {reportFields.map((report) => (
              <div>
                <TextField
                  key={report.id}
                  style={{ margin: "10px" }}
                  label={report.labelName}
                  disabled={report.status === "disabled"}
                  variant="outlined"
                  onChange={(e) => updateValues(e, report.id)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
                <br />
              </div>
            ))}

            <Button
              onClick={(e) => submitReport(e)}
              style={{ marginBottom: "20px", marginTop: "20px" }}
              variant="contained"
            >
              Add Report
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
