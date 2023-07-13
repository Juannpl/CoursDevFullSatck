import React, { useState } from 'react';
import { Button, Col, Modal, Row, Form } from 'react-bootstrap';
import { createPost } from '../api/post';

const CreatePost = ({ setPosts, posts }) => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const token = localStorage.getItem('token');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleCreatePost = async (event) => {
      event.preventDefault();
  
      const data = {
        "title": title,
        "description": description
      }
  
      await createPost(data, token)
      .then((post) => {
        setPosts([...posts, post])
        handleClose();
        setDescription('');
        setTitle('');
      })
      .catch((e) => {
        console.log(e);
      })
    }

    return (
        <section className='d-flex justify-content-center mt-5'>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <h3>Posts</h3>
                </Col>
                <Col className='d-flex justify-content-center'>
                    <div
                    className="modal show"
                    style={{ display: 'block', position: 'initial' }}
                    >
                    <Button variant="primary" onClick={handleShow}>
                    Create
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new post</Modal.Title>
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
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title"
                                value={title}
                            />
                            </Form.Group>

                            <Form.Group
                            className="mb-3"
                            controlId="formDescription"
                            >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                placeholder="Description"
                                value={description}
                            />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={handleCreatePost}>
                        Save
                        </Button>
                    </Modal.Footer>
                    </Modal>
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default CreatePost