import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./lauouts/Layout";
import {
  addUser,
  deleteUsers,
  editUsers,
  getUsers,
} from "../redux/actions/userActions";
import Table from "react-bootstrap/Table";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    roles: "",
  });
  const navigate = useNavigate();

  const adminUsers = useSelector((state) => state.users.users) || [];
  const loggedUser = useSelector((state) => state.users.auth) || [];
  const userAuth = useSelector((state) => state.users.auth);
  console.log(loggedUser);

  const isAdmin = loggedUser.length > 0 && loggedUser[0].roles === "admin";
  console.log("isAdmin", isAdmin);

  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [usersDisplay, setUsersDisplay] = useState([]);

  useEffect(() => {
    const roleUsers =
      loggedUser.length > 0 && loggedUser[0].roles === "admin"
        ? adminUsers
        : userAuth;
    setUsersDisplay(roleUsers);
    console.log(roleUsers);
  }, [userAuth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(user.id ? editUsers(user) : addUser(user));
    await dispatch(getUsers());
    setLoading(false);
    // Reset the form
    setUser({ name: "", age: "", dept: "" });
    setEditId(undefined);
  };
  const getUser = async () => {
    setLoading(true);
    const res = await dispatch(getUsers());
    setLoading(false);
  };

  useEffect(() => {
    if (usersDisplay.length === 0) {
      getUser();
    }
  }, [dispatch]);

  const handleEdit = async (user) => {
    setLoading(true);
    setUser(user);
    setEditId(user.id);
    //navigate(`users/${user.id}`);
    //await editUsers(user);
    getUser();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await dispatch(deleteUsers(id));
    getUser();
    setLoading(false);
  };

  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        {/* <form onSubmit={handleSubmit} style={{ marginBottom: 50 }}>
          <input
            type="text"
            name="name"
            value={user.firstName}
            onChange={handleChange}
            placeholder="Enter firstName"
            required
          />
          <input
            type="text"
            name="name"
            value={user.lastName}
            onChange={handleChange}
            placeholder="Enter astName"
            required
          />
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            placeholder="Enter Age"
            required
          />
          <input
            type="text"
            value={user.dept}
            name="dept"
            onChange={handleChange}
            placeholder="Enter Department"
            required
          />
          <button type="submit">{editId ? "Update User" : "Add User"}</button>
        </form> */}
        {editId && (
          <>
            <h2>User Management</h2>
            <Row
              style={{ width: "50%", textAlign: "center", marginLeft: "25%" }}
            >
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={user.firstName}
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
                        value={user.lastName}
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
                    disabled={editId}
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Roles</Form.Label>
                  <Form.Control
                    as="select"
                    name="roles"
                    value={user.roles}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Role...</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  {editId ? "Save" : "Register"}
                </Button>
                &nbsp;
                <Button variant="primary" type="submit">
                  {editId ? "Cancel" : null}
                </Button>
              </Form>
            </Row>
          </>
        )}
        <h1>Display Users</h1>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Upadte User</th>
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {usersDisplay.map((user) => (
                <tr key={user.id}>
                  <td>#</td>
                  <td>
                    {user.firstName}
                    &nbsp;
                    {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.roles}</td>
                  <td>
                    <Button
                      variant="primary"
                      disabled={!isAdmin}
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      disabled={!isAdmin}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </Layout>
  );
};

export default React.memo(Users);
