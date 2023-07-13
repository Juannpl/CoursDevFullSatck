import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { updateUser } from '../api/auth';
import { UserContext } from '../AuthContext/UserContext';

const UpdateUserModal = ({ handleClose, userToUpdate, show }) => {
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const { saveUser } = useContext(UserContext);

    const handleUpdateUser = async (event) => {
        event.preventDefault();
    
        const data = {
          "prenom": newFirstName,
          "nom": newLastName
        }
    
        await updateUser(userToUpdate.id, data)
        .then(() => {   
            handleClose();
            saveUser();
            setNewFirstName('');
            setNewLastName('');
        })
        .catch((e) => {
          console.log(e);
        })
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
            >
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="formTitle"
                    >
                    <Form.Label className="text-center">
                        Last Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setNewLastName(e.target.value)}
                        placeholder={userToUpdate.nom}
                        value={newLastName}
                    />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formDescription"
                    >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        onChange={(e) => setNewFirstName(e.target.value)}
                        type="text"
                        placeholder={userToUpdate.prenom}
                        value={newFirstName}
                    />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdateUser}>
                    Save
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdateUserModal;