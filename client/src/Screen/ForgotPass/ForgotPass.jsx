import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Card, Alert } from "react-bootstrap";

function ForgotPassPage() {
  const [alertType, setAlertType] = useState();
  const [alert, setAlert] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [hoverColor, setHoverColor] = useState("black");

  const username = useRef();
  const newPassword = useRef();
  const conNewPassword = useRef();

  const navigate = useNavigate();

  const fields = [
    {
      fieldName: "username",
      type: "text",
      labelName: "Username",
      required: true,
      reference: username,
    },
    {
      fieldName: "newpass",
      type: "text",
      labelName: "New Password",
      required: true,
      reference: newPassword,
    },
    {
      fieldName: "confirmnewpass",
      type: "password",
      labelName: "Confirm New Password",
      required: true,
      reference: conNewPassword,
    },
  ];
  const createUser = (e) => {
    e.preventDefault();
    const userForgotPassDetails = {
      username: username.current.value,
      newPassword: newPassword.current.value,
      conNewPassword: conNewPassword.current.value,
    };
    console.log(userForgotPassDetails);
    // axios
    //   .post("http://localhost:3000/new-user", userForgotPassDetails)
    //   .then((resp) => {
    //     if (resp.data) {
    //       if (resp.data.message === "success") {
    //         setAlertType("success");
    //         setAlert(() => "New User Created Successfully");
    //         setOpenAlert(true);
    //       } else {
    //         setAlertType("danger");
    //         setAlert(() => "Failed to Create User");
    //         setOpenAlert(true);
    //       }
    //     }
    //   });
  };
  const goToLoginPage = () => {
    navigate("/login");
  };
  return (
    <div
      style={{
        marginTop: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          minHeight: "250px",
          minWidth: "250px",
        }}
      >
        <Card.Title
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Sign Up
        </Card.Title>
        <Card.Body>
          <Form
            style={{
              margin: "2vh",
              marginTop: 0,
            }}
          >
            {fields.map((field) => (
              <Form.Group className="mb-3" controlId={field.fieldName}>
                <Form.Label>{field.labelName}</Form.Label>
                <Form.Control
                  type={field.type}
                  ref={field.reference}
                  placeholder={field.labelName}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
            ))}
            <Alert
              variant={alertType}
              style={{
                display: openAlert ? "" : "none",
              }}
            >
              {alert}
            </Alert>
            <Button
              style={{
                width: "100%",
                backgroundColor: "purple",
              }}
              variant="primary"
              type="submit"
              onClick={(e) => createUser(e)}
            >
              Create Account
            </Button>
            <div
              style={{
                margin: "10px",
                textAlign: "center",
              }}
            >
              <a
                onMouseEnter={() => setHoverColor("purple")}
                onMouseLeave={() => setHoverColor("black")}
                onClick={() => goToLoginPage()}
                style={{
                  color: hoverColor,
                }}
              >
                Go to Login Page...
              </a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ForgotPassPage;
