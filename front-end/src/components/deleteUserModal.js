import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteUser } from '../api/auth';
import { UserContext } from '../AuthContext/UserContext';
import { useNavigate } from 'react-router-dom';

const DeleteUserModal = ({ handleClose, show, userId }) => {
    const { logoutUser } = useContext(UserContext);
    const navigate = useNavigate()

    const handleDeleteUser = async () => {
        await deleteUser(userId)  
        .then(() => {
            logoutUser();
            navigate('/login');
        })
        .catch((e) => {
            console.log(e);
        })
    };

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
            >
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDeleteUser}>
                    Save
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DeleteUserModal;