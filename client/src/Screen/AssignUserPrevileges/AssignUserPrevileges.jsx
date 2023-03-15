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
      disabled: false,
    },
    {
      FieldId: "[2]",
      FieldName: "Invoice",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[2]"),
      disabled: false,
    },
    {
      FieldId: "[3]",
      FieldName: "Customer",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[3]"),
      disabled: false,
    },
    {
      FieldId: "[4]",
      FieldName: "Medicine",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[4]"),
      disabled: false,
    },
    {
      FieldId: "[5]",
      FieldName: "Pharmacist",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[5]"),
      disabled: false,
    },
    {
      FieldId: "[6]",
      FieldName: "Delivery Man",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[6]"),
      disabled: false,
    },
    {
      FieldId: "[7]",
      FieldName: "Sales Report",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[7]"),
      disabled: false,
    },
    {
      FieldId: "[8]",
      FieldName: "Purchase",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[8]"),
      disabled: false,
    },
    {
      FieldId: "[9]",
      FieldName: "Reports",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[9]"),
      disabled: false,
    },
    {
      FieldId: "[11]",
      FieldName: "Order Approval",
      FieldType: "checkbox",
      isChecked: usePrevileges && usePrevileges.includes("[11]"),
      disabled: true,
    },
  ];
  const changeOption = (e, id) => {
    if (!e.target.checked) {
      setUserPrevileges(() => usePrevileges.replace(id, ""));
    } else {
      setUserPrevileges(() => usePrevileges + id);
    }
  };

  const fetchUserPrevileges = async () => {
    let userPrevileges = "";
    allMenus.map((menu) => {
      if (menu.isChecked) {
        userPrevileges += menu.FieldId;
      }
    });
    return userPrevileges;
  };

  const updatePrevileges = async (e) => {
    e.preventDefault();
    let userPrevileges = await fetchUserPrevileges();
    console.log(userPrevileges);
    axios
      .post("http://localhost:3000/update-user-previleges", {
        username: selectedUser[0].label,
        userPrevileges: userPrevileges,
      })
      .then((resp) => {
        setSeverity(resp.data.status);
        setMessage(resp.data.message);
        setOpen(true);
      })
      .catch((err) => {
        setSeverity("error");
        setMessage("Something went wrong");
        setOpen(true);
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:3000/get-users", { search: "" })
      .then((resp) => {
        let userOpt = [];
        resp.data.users.map((user) => {
          userOpt.push({ label: user.username });
        });
        setUsers(userOpt);
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
        <div
          style={{
            margin: "10px",
            display: "flex",
            gap: "5px",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h6 style={{ margin: 0, padding: 0 }}>SELECTED USER : </h6>
          </div>
          <div style={{ textDecorationLine: "underline", color: "purple" }}>
            {selectedUser && selectedUser.length === 1
              ? selectedUser[0].label
              : "none"}
          </div>
        </div>
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
                  disabled={menu.disabled}
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
        onClick={(e) => updatePrevileges(e)}
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
