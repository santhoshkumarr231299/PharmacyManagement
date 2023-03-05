import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { validatePassword } from "../../Validations/validations";

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
  const changePassword = (e) => {
    e.preventDefault();
    const userForgotPassDetails = {
      username: username.current.value,
      newPass: newPassword.current.value,
      conNewPass: conNewPassword.current.value,
    };

    if (userForgotPassDetails.newPass !== userForgotPassDetails.conNewPass) {
      setAlertType("danger");
      setAlert(() => "Password Mismatch");
      setOpenAlert(true);
    }
    let valid = validatePassword(newPassword.current.value);
    if (valid && valid.length > 0) {
      setAlertType("warning");
      setAlert(valid);
      setOpenAlert(true);
      return;
    }
    axios
      .post("http://localhost:3000/forgot-pass-change", userForgotPassDetails)
      .then((resp) => {
        if (resp.data) {
          if (resp.data.status === "success") {
            setAlertType("success");
            setAlert(() => resp.data.message);
            setOpenAlert(true);
          } else {
            setAlertType("danger");
            setAlert(() => resp.data.message);
            setOpenAlert(true);
          }
        }
      });
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
          minWidth: "400px",
        }}
      >
        <Card.Title
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Forgot Password
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
              onClick={(e) => changePassword(e)}
            >
              Change Password
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
