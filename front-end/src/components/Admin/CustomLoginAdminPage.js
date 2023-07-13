import React, { useState } from 'react';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import AuthProvider from './AuthProvider';

const CustomLoginAdminPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthProvider.login({ email, password })
        .catch((e) => console.log(e))
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
                                Admin
                                </h2>
                                <div className="mb-3">
                                    <Form onSubmit={handleSubmit}>
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
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CustomLoginAdminPage;