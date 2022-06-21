import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function Bar() {
  return (
    <div className="p-1">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand className="brand">
          <Nav.Link href="/"> <img
              src="https://odoo-ai.com/pakloccorp/pakloc-removebg-preview.png"
              alt="logo"
              width="120"
            /></Nav.Link>
           
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ms-auto d-flex justify-content-center p-1 navbar ">
              <strong>
                <Nav.Link href="/">Home</Nav.Link>
              </strong>
              <strong>
                <Nav.Link href="/Search">Browse</Nav.Link>
              </strong>
              <strong>
              <NavDropdown title="Data" id="basic-nav-dropdown">
          <NavDropdown.Item href="/Downloaddata">Download Data</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Upload Data</NavDropdown.Item>
        </NavDropdown>
              </strong>
              <strong>
                <Nav.Link href="/LogReg">Login/Register</Nav.Link>
              </strong>
              <strong>
                <Nav.Link href="#link">Publications</Nav.Link>
              </strong>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
