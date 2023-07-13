import React, { useContext, useState } from 'react'
import { loginUser } from '../api/auth';
import { Card, Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../AuthContext/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { saveUser } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      "email": email,
      "password": password
    }

    await loginUser(data)
    .then( async (token) => {
      if(token) {
        await saveUser()
        navigate('/');
      }
    })
    .catch((e) => {
      console.log(e);
    })
  }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Logo
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleLogin}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter email"
                          value={email}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                          value={password}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="submit"
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0 text-center">
                        Don't have an account?{' '}
                        <a href='/register' className="text-primary fw-bold">
                          Sign up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login