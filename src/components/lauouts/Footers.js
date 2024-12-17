import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footers = () => {
  return (
    <footer
      className="text-center text-lg-start"
      style={{ background: "gray" }}
    >
      <Container className="p-4">
        <Row>
          <Col lg={6} md={12} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">E-commerce App</h5>
            <p>
              Your one-stop shop for all your needs. Explore our wide range of
              products and enjoy a seamless shopping experience.
            </p>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/users">User Info</a>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled">
              <li>Email: info@example.com</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3 bg-dark text-white">
        © {new Date().getFullYear()} E-commerce App. All rights reserved.
      </div>
    </footer>
  );
};

export default React.memo(Footers);
