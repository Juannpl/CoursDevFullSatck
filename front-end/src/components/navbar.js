import React, { useContext } from 'react'
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { UserContext } from '../AuthContext/UserContext';
import { useNavigate } from 'react-router-dom';

const CustomNavbar = () => {
  const token = localStorage.getItem('token');
  const { logoutUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {token ?           
                <Nav.Link href='/profile'>Profile</Nav.Link>
                : null
              }
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                  Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                  Separated link
                  </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link>
                {user ? 
                  <Button variant='danger' onClick={handleLogout}>
                    Logout
                  </Button> : null
                }
              </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default CustomNavbar;