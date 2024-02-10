import React,{useEffect,useState} from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

export default function Bar() {
  const navigation = useNavigate();

  useEffect(()=>{
    let data = localStorage.getItem('corpusUserData')
    if(data!==null){
      setIsloggedIn(true)
    }
  },null)
  const [isLoggedIn,setIsloggedIn] = useState(false)
  return (
    <div className="p-1">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand className="brand">
          <Nav.Link href="/"> <img
              src="https://firebasestorage.googleapis.com/v0/b/ituiniwebsite.appspot.com/o/pakloc-removebg-preview.png?alt=media&token=ef9ea523-157d-43d4-a6aa-d3806495606a"
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
                <Nav.Link href="/Help">Help</Nav.Link>
              </strong>
              <strong>
                <Nav.Link href="/Contact">Contact Us</Nav.Link>
              </strong>
              <strong>
                <Nav.Link href="/About">About</Nav.Link>
              </strong>
              <strong>
              <NavDropdown title="Corpora of PakEng" id="basic-nav-dropdown">
          <NavDropdown.Item href="/Downloaddata">Download Data</NavDropdown.Item>
          <NavDropdown.Item href="/Uploaddata">Upload Data</NavDropdown.Item>
        </NavDropdown>
              </strong>
              {isLoggedIn==false && <strong>
                <Nav.Link href="/LogReg">Login/Register</Nav.Link>
              </strong>}
              <strong>
                <Nav.Link href="/Publication">Publications</Nav.Link>
              </strong>
              {isLoggedIn===true &&   <button class="btn btn-danger btn-sm text-white"
                    style={{ }}
                    onClick={() => {
                      localStorage.removeItem('corpusUserData')
                      navigation('/')
                      console.log('windowwww--->',window.location.pathname)
                      if(window.location.pathname==='/'){
                        window.location.reload()
                      }
                    }}
                  >
                    LOGOUT
                  </button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
