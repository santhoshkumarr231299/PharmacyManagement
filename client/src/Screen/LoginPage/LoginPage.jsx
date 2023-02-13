import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Card, Alert } from "react-bootstrap";

function LoginPage() {
  const [alertType, setAlertType] = useState();
  const [alert, setAlert] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  const username = useRef();
  const password = useRef();

  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3000/logged-in").then((res) => {
      if (res.data.username !== "") {
        navigate("/");
      }
    });
  }, []);
  const validateLogin = (e) => {
    e.preventDefault();
    console.log({
      username: username.current.value,
      password: password.current.value,
    });
    axios
      .post("http://localhost:3000/login", {
        username: username.current.value,
        password: password.current.value,
      })
      .then((res) => {
        if (res.data.message === "success") {
          navigate("/");
        } else {
          setAlertType("danger");
          setAlert(() => "Failed to Login");
          setOpenAlert(() => true);
        }
      });
  };

  const fields = [
    {
      fieldName: "username",
      labelName: "Username",
      type: "text",
      required: true,
      reference: username,
    },
    {
      fieldName: "password",
      labelName: "Password",
      type: "password",
      required: true,
      reference: password,
    },
  ];

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
          Sign In
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
              }}
              variant="primary"
              type="submit"
              onClick={(e) => validateLogin(e)}
            >
              Log In
            </Button>
            <div
              style={{
                margin: "10px",
                textAlign: "center",
              }}
            >
              <a onClick={0}>Forgot your password</a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginPage;
