import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = ({ isAuthenticated = true, onLogout }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        E-commerce
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <div style={{ alignContent: "flex-end" }}>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/products">
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  Cart
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  User Info
                </Nav.Link>
                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default React.memo(Navigation);
