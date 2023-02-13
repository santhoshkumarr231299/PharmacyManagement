import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Card } from "react-bootstrap";

function LoginPage() {
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
          // navigate("/");
        } else {
          document.getElementById("alert").innerHTML = "Login Failed";
        }
      });
  };

  const fields = [
    {
      fieldName: "username",
      labelName: "Username",
      type: "text",
      required: true,
    },
    {
      fieldName: "password",
      labelName: "Password",
      type: "password",
      required: true,
    },
  ];

  return (
    <div className="container">
      <Card
        style={{
          minHeight: "250px",
          maxWidth: "400px",
        }}
      >
        <Form
          style={{
            margin: "2vh",
          }}
        >
          {fields.map((field) => (
            <Form.Group className="mb-3" controlId={field.fieldName}>
              <Form.Label>{field.labelName}</Form.Label>
              <Form.Control
                type={field.type}
                ref={field.fieldName === "username" ? username : password}
                placeholder={field.labelName}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
          ))}
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => validateLogin(e)}
          >
            LOGIN
          </Button>
          <div>
            <a href="#">Forgot your password</a>
          </div>
          <span id="alert"></span>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
