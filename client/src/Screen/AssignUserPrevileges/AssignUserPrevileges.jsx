import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { Paper, Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Typeahead } from "react-bootstrap-typeahead";

export default function AssignUserPrevilegesPage(props) {
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
        <AssignUserPrevileges />
      </Paper>
    </div>
  );
}

function AssignUserPrevileges(props) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setMessage("");
    setSeverity("");
    setOpen(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [selectedUser, setSelectedUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [usePrevileges, setUserPrevileges] = useState("");

  const allMenus = [
    {
      FieldId: "[1]",
      FieldName: "Dashboard",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[1]"),
    },
    {
      FieldId: "[2]",
      FieldName: "Invoice",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[2]"),
    },
    {
      FieldId: "[3]",
      FieldName: "Customer",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[3]"),
    },
    {
      FieldId: "[4]",
      FieldName: "Medicine",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[4]"),
    },
    {
      FieldId: "[5]",
      FieldName: "Pharmacist",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[5]"),
    },
    {
      FieldId: "[6]",
      FieldName: "Delivery Man",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[6]"),
    },
    {
      FieldId: "[7]",
      FieldName: "Sales Report",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[7]"),
    },
    {
      FieldId: "[8]",
      FieldName: "Purchase",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[8]"),
    },
    {
      FieldId: "[9]",
      FieldName: "Reports",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[9]"),
    },
  ];
  const changeOption = (e, id) => {
    if (!e.target.checked) {
      setUserPrevileges(() => usePrevileges.replace(id, ""));
    } else {
      setUserPrevileges(() => usePrevileges + id);
    }
  };

  useEffect(() => {
    axios
      .post("http://localhost:3000/get-users", { search: "" })
      .then((resp) => {
        setSeverity(resp.data.status);
        setMessage(resp.data.message);
        setOpen(true);
        let userOpt = [];
        resp.data.users.map((user) => {
          userOpt.push({ label: user.username });
        });
        setUsers(userOpt);
        console.log(userOpt);
      })
      .catch((err) => {
        setSeverity("error");
        setMessage("Something went wrong");
        setOpen(true);
      });
  }, []);

  useEffect(() => {
    if (selectedUser && selectedUser.length === 1) {
      axios
        .post("http://localhost:3000/get-user-previleges", {
          username: selectedUser[0].label,
        })
        .then((resp) => {
          setUserPrevileges(resp.data.userPrevileges);
        })
        .catch((err) => {
          setSeverity("error");
          setMessage("Something went wrong");
          setOpen(true);
        });
    } else {
      setUserPrevileges("");
    }
  }, [selectedUser]);

  return (
    <div>
      <Form>
        <Form.Group
          style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}
        >
          <Typeahead
            id="typeahead"
            labelKey="label"
            onChange={setSelectedUser}
            options={users}
            placeholder="Select a User..."
            selected={selectedUser}
          />
        </Form.Group>
        <h6
          style={{
            margin: "10px",
            display: "flex",
            gap: "5px",
            margin: "auto",
            justifyContent: "center",
          }}
        >
          <div>Selected User : </div>
          <div>
            {selectedUser && selectedUser.length === 1
              ? selectedUser[0].label
              : "none"}
          </div>
        </h6>
        <div
          style={{
            padding: "20px",
            width: "200px",
            margin: "auto",
            textAlign: "left",
            display: selectedUser && selectedUser === "" ? "none" : "block",
          }}
        >
          {selectedUser.length > 0 &&
            allMenus.map((menu) => (
              <div>
                <Form.Check
                  id={menu.FieldName}
                  onChange={(e) => changeOption(e, menu.FieldId)}
                  type={menu.FieldType}
                  label={menu.FieldName}
                  checked={menu.isChecked}
                />
              </div>
            ))}
        </div>
      </Form>
      <Button
        style={{
          marginBottom: "20px",
          marginTop: "10px",
          backgroundColor: "purple",
        }}
        variant="contained"
        // onClick={(e) => updateDetails(e)}
      >
        Save Previleges
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
