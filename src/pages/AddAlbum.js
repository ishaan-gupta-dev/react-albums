import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { addAlbum } from '../api';
import { useAlbums } from '../hooks'


function AddAlbum() {

    // albums from context
    const albumsFromState = useAlbums();

    // hooks for setting id,user id,title
    const [id, setId] = useState("");
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");

    const navigate = useNavigate();

    // toast hooks
    const [addAlbumSuccess, setAddAlbumSuccess] = useState(false);
    const toggleAddAlbumSuccess = () => setAddAlbumSuccess(!addAlbumSuccess);

    // create a new album API call
    async function createNewAlbum(e) {
        e.preventDefault();
        const response = await addAlbum(id, userId, title);
        console.log(response);
        if (response.success) {
            console.log("res after success", response.data);
            let newAlbum = response.data;
            albumsFromState.addAlbumToState(newAlbum); // add the new album to the album context
            toggleAddAlbumSuccess(); // show the added succesfully toast
            setTimeout(() => {
                navigate("/");
            }, "6000")

        } else {
            console.log("error in adding album", response.message);
        }

    }
    return (
        <>
            <h1 id="add-album-heading" className="mt-4 ml-5">
                <Badge bg="light" text="dark">Submit the form to add a new album in the Home page</Badge>
            </h1>
            <Container className='mt-4 ms-2'>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="id">
                        <Form.Label column sm={1}>
                            Id
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control required={true} type="number" placeholder="API does not support id creation for new album" value={id} onChange={(e) => { setId(e.target.value) }} disabled />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="userId">
                        <Form.Label column sm={1}>
                            User Id
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control required={true} type="text" placeholder="user id" value={userId} onChange={(e) => { setUserId(e.target.value) }} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="title">
                        <Form.Label column sm={1}>
                            Title
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control required={true} type="text" placeholder="title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={createNewAlbum}>
                        Submit
                    </Button>
                </Form>
            </Container>

            {/* add album successfully Toast  */}
            <ToastContainer className="p-3" position="top-end" containerPosition="fixed">
                <Toast show={addAlbumSuccess} onClose={toggleAddAlbumSuccess} bg="light" delay={4000} autohide>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">React-Albums</strong>
                    </Toast.Header>
                    <Toast.Body className="light">
                        Album added successfully!
                        <br />
                        You will now be redirected to the Home page, your album will be present at bottom
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}

export default AddAlbum;