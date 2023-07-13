import React, { useContext, useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { UserContext } from '../AuthContext/UserContext';
import DeleteUserModal from '../components/deleteUserModal';
import UpdateUserModal from '../components/updateUserModal';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);

    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    return (
        user != null ?
            <div>
                <Container>
                    <Row className='w-100 d-flex justify-content-center'>
                        <Col className='d-flex justify-content-center mt-5'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{`${user.prenom} ${user.nom}`}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>{user.email}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <div className='d-flex justify-content-between'>
                                        <Button onClick={handleShowUpdateModal}>Update User</Button>
                                        <Button variant="danger" onClick={handleShowDeleteModal}>Delete user</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <DeleteUserModal handleClose={handleCloseDeleteModal} show={showDeleteModal} userId={user.id}/>
                    <UpdateUserModal handleClose={handleCloseUpdateModal} show={showUpdateModal} userToUpdate={user}/>
                </Container>
            </div> : null
    )
}

export default Profile