import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { updatePost } from '../api/post';

const UpdatePostModal = ({ setPosts, posts, handleClose, postToUpdate, show }) => {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleUpdatePost = async (event) => {
        event.preventDefault();
    
        const data = {
          "title": newTitle,
          "description": newDescription
        }
    
        await updatePost(data, postToUpdate.id)
        .then((newPost) => {   

            const index = posts.findIndex(post => post.id === postToUpdate.id)
            const updatedPosts = [...posts.slice(0, index), newPost, ...posts.slice(index + 1)]

            setPosts(updatedPosts);
            handleClose();
            setNewDescription('');
            setNewTitle('');
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
                <Modal.Title>Update Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="formTitle"
                    >
                    <Form.Label className="text-center">
                        Title
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder={postToUpdate.title}
                        value={newTitle}
                    />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formDescription"
                    >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        onChange={(e) => setNewDescription(e.target.value)}
                        type="text"
                        placeholder={postToUpdate.description}
                        value={newDescription}
                    />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdatePost}>
                    Save
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdatePostModal;