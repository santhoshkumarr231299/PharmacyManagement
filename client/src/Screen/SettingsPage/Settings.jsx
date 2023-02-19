import axios from "axios";
import React, { useState } from "react";
import { Paper, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function Settings(props) {
  const [option, setOption] = useState(1);
  const [isButtonClicked, setButtonClicked] = useState(false);
  const settings = () => {
    switch (option) {
      case 1:
        return <UserDetails username={props.username} />;
      case 2:
        return <ChangePass />;
      default:
    }
  };
  const callChangePass = (e) => {
    e.preventDefault();
    if (!isButtonClicked) {
      setButtonClicked(true);
      setOption(2);
    } else {
      setButtonClicked(false);
      setOption(1);
    }
  };
  return (
    <div>
      <Paper
        elevation={3}
        style={{
          textAlign: "center",
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
            margin: "15px",
            right: -400,
            backgroundColor: "purple",
          }}
          variant="contained"
          onClick={(e) => callChangePass(e)}
        >
          {isButtonClicked ? "Back" : "Change Password"}
        </Button>
        {settings()}
      </Paper>
    </div>
  );
}

function UserDetails(props) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});
  const userFields = [
    {
      id: 1,
      fieldName: "username",
      labelName: "Username",
      value: props.username,
      status: "disabled",
    },
    {
      id: 2,
      fieldName: "email",
      labelName: "Email",
      value: user.email,
      status: "active",
    },
    {
      id: 3,
      fieldName: "mobile-number",
      labelName: "Mobile Number",
      value: user.mobileNumber,
      status: "active",
    },
    {
      id: 4,
      fieldName: "pharmacy-name",
      labelName: "Pharmacy Name",
      value: user.pharmacyName,
      status: "disabled",
    },
    {
      id: 5,
      fieldName: "branch-id",
      labelName: "Branch ID",
      value: user.branchId,
      status: "active",
    },
  ];
  const handleClose = () => {
    setMessage("");
    setSeverity("");
    setOpen(false);
  };
  const updateDetails = () => {
    axios
      .post("http://localhost:3000/update-user-details", {
        username: userFields[0].value,
        email: userFields[1].value,
        mobileNumber: userFields[2].value,
        pharmacyName: userFields[3].value,
        branchId: userFields[4].value,
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
      });
  };
  const updateValues = (e, id) => {
    userFields[id - 1].value = e.target.value;
  };
  const fetchData = () => {
    axios
      .post("http://localhost:3000/get-user-details", {
        username: props.username,
      })
      .then((resp) => {
        let tempUser = resp.data;
        setUser(tempUser);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <div>
      {userFields.map((userField) => (
        <div>
          <TextField
            key={userField.id}
            style={{ margin: "10px" }}
            label={userField.labelName}
            disabled={userField.status === "disabled"}
            defaultValue={userField.value}
            variant="outlined"
            onChange={(e) => updateValues(e, userField.id)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <br />
        </div>
      ))}
      <Button
        style={{
          marginBottom: "20px",
          marginTop: "10px",
          backgroundColor: "purple",
        }}
        variant="contained"
        onClick={(e) => updateDetails(e)}
      >
        Save Details
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      ;
    </div>
  );
}

function ChangePass(props) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const changePassFields = [
    {
      id: 1,
      type: "text",
      fieldName: "newpass",
      labelName: "New Password",
      status: "active",
    },
    {
      id: 2,
      type: "password",
      fieldName: "confirm-newpass",
      labelName: "Confirm New Password",
      status: "active",
    },
    {
      id: 3,
      type: "password",
      fieldName: "old-password",
      labelName: "Old Password",
      status: "active",
    },
  ];
  const handleClose = () => {
    setMessage("");
    setSeverity("");
    setOpen(false);
  };
  const updatePassword = () => {
    if (newPass === confirmNewPass) {
      axios
        .post("http://localhost:3000/update-pass", {
          newPass: newPass,
          oldPass: oldPass,
        })
        .then((resp) => {
          setSeverity(resp.data.status);
          setMessage(resp.data.message);
          setOpen(true);
        })
        .catch((err) => {
          setMessage("Something went wrong");
          setSeverity("error");
          setOpen(true);
        });

      console.log("pass matched");
    } else {
      setMessage("New Password Mismatch");
      setSeverity("warning");
      setOpen(true);
      console.log("pass mismatch");
    }
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <div
      style={{
        display: "",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {changePassFields.map((field) => (
        <div>
          <TextField
            style={{ margin: "10px" }}
            id={field.fieldName}
            type={field.type}
            label={field.labelName}
            variant="outlined"
            disabled={field.status === "disabled"}
            onChange={(e) => {
              if (field.fieldName === "newpass") {
                setNewPass(e.target.value);
              } else if (field.fieldName === "confirm-newpass") {
                setConfirmNewPass(e.target.value);
              } else {
                setOldPass(e.target.value);
              }
            }}
            InputLabelProps={{
              shrink: true,
            }}
            required={true}
          />
          <br />
        </div>
      ))}
      <Button
        style={{
          backgroundColor: "purple",
          marginBottom: "20px",
          marginTop: "10px",
        }}
        variant="contained"
        onClick={(e) => updatePassword(e)}
      >
        Save New Password
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
