import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deletePost } from '../api/post';

const DeletePostModal = ({ handleClose, show, postId, posts, setPosts }) => {

    const handleDeletePost = () => {
        deletePost(postId)  
        .then(() => {
            const index = posts.findIndex(post => post.id === postId)
            const updatedPosts = [...posts.slice(0, index), ...posts.slice(index + 1)]
            setPosts(updatedPosts);
            handleClose();
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
                <Modal.Title>Delete Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDeletePost}>
                    Save
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DeletePostModal