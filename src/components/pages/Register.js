// src/Register.js
import React, { useState } from "react";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/userActions";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    roles: "",
  });
  const dispatch = useDispatch();

  const { id } = useParams();
  console.log(id);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const loggedUser = JSON.parse(sessionStorage.getItem("loginUser")) || [];

  const userEdit = loggedUser[0];

  const {
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
    roles,
  } = id ? userEdit : formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(false);
  };

  const validateForm = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (!roles) {
      setError("Please select a role.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = dispatch(addUser(formData));
      setSuccess(true);
      setError(null);
      navigate("/users");
      console.log("User registered:", response.data);
    } catch (error) {
      setError("Error registering user. Please try again.");
      setSuccess(false);
      console.error("Error registering user:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>{id ? "Edit User" : "Register"}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">User registered successfully!</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            disabled={id}
            value={email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Roles</Form.Label>
          <Form.Control
            as="select"
            name="roles"
            value={roles}
            onChange={handleChange}
            required
          >
            <option value="">Select Role...</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>
        {!id && (
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
        )}
        {!id && (
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}
        <Button variant="primary" type="submit">
          {id ? "Save" : "Register"}
        </Button>
      </Form>
      {!id && (
        <div className="mt-3">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      )}
    </Container>
  );
};

export default Register;
