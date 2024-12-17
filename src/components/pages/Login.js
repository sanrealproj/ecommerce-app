// src/Login.js
import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const response = await dispatch(loginUser(email, password));
      setSuccess(true);
      setError(null);
      const user = response;
      console.log("User logged in:", response);
      sessionStorage.setItem("loginUser", JSON.stringify(user));
      navigate("/users");
      // Store token and handle successful login (e.g., redirect or show a message)
    } catch (error) {
      setError("Error logging in. Please check your credentials.");
      setSuccess(false);
      console.error("Error logging in:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">User logged in successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
