import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Card, Alert } from "react-bootstrap";

function NewUserPage() {
  const [alertType, setAlertType] = useState();
  const [alert, setAlert] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [hoverColor, setHoverColor] = useState("black");
  const [opacity, setOpacity] = useState("60%");

  const username = useRef();
  const password = useRef();
  const email = useRef();
  const phoneNumber = useRef();

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
      fieldName: "password",
      type: "password",
      labelName: "Password",
      required: true,
      reference: password,
    },
    {
      fieldName: "phone",
      type: "number",
      labelName: "Phone Number",
      required: true,
      reference: phoneNumber,
    },
    {
      fieldName: "email",
      type: "email",
      labelName: "Email",
      required: true,
      reference: email,
    },
  ];
  const createUser = (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value,
      password: password.current.value,
    };
    console.log(user);
    axios.post("http://localhost:3000/new-user", user).then((resp) => {
      if (resp.data) {
        if (resp.data.message === "success") {
          setAlertType("success");
          setAlert(() => "New User Created Successfully");
          setOpenAlert(true);
        } else {
          setAlertType("danger");
          setAlert(() => "Failed to Create User");
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
          minWidth: "250px",
        }}
      >
        <Card.Title
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "80%",
                opacity: opacity,
              }}
              onMouseEnter={() => {
                setOpacity("100%");
              }}
              onMouseLeave={() => {
                setOpacity("60%");
              }}
              onClick={() => goToLoginPage()}
            >
              Sign In
            </div>
            <div style={{ color: "purple" }}>New User</div>
          </div>
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
            {/* <div
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
                Already a user?
              </a>
            </div> */}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default NewUserPage;
