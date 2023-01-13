import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { updateAlbum } from '../api';
import { useAlbums } from "../hooks";


function UpdateAlbumModal(props) {

    // albums from context
    const albumsFromState = useAlbums();
    // getting props
    const { albumId, albums, handleChangeInAlbums, onHide } = props;

    // hooks to autofill the id, title and userid in modal 
    let [album, setAlbum] = useState({ id: "", userId: "", title: "" });
    let [id, setId] = useState(album.id);
    let [userId, setUserId] = useState(album.userId);
    let [title, setTitle] = useState(album.title);

    // alert hooks
    const [alertShow, setAlertShow] = useState(false);

    // autofill the id, user id and title in modal
    useEffect(() => {
        let album = albums.find((album) => album.id == albumId);
        // do nothing if the button is not clicked and album is not found
        if (album == undefined) {
            return;
        }
        // when album found, set it using hooks
        setAlbum(album);
        setId(album.id);
        setUserId(album.userId);
        setTitle(album.title);
    }, [albumId, albums]);

    // update album api call
    async function updateAlbumFunc() {
        const response = await updateAlbum(albumId, id, userId, title);
        if (response.success) {
            let updatedAlbums = albums.filter((album) => {
                return album.id != albumId;
            });
            updatedAlbums.push(response.data);
            handleChangeInAlbums(updatedAlbums);
            props.onHide(); // hide the model after updating
            props.toggleUpdateSuccess(); // show the updates succesfull toast on success
        } else { // show alert if error on update
            setAlertShow(true);
        }

    }

    // dynamic update value of input on change
    function handleChange(e) {
        if (e.target.name === "id") {
            setId(e.target.value);
        } else if (e.target.name === "userId") {
            setUserId(e.target.value);
        } else if (e.target.name === "title") {
            setTitle(e.target.value);
        }
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Album
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='mt-4 ms-2'>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="id">
                                <Form.Label column sm={2}>
                                    Id
                                </Form.Label>
                                <Col sm={4}>
                                    <Form.Control type="number" name="id" value={id} onChange={(e) => handleChange(e)} disabled />
                                    <Form.Text className="text-muted">
                                        id updation not supported by API
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="userId">
                                <Form.Label column sm={2}>
                                    User Id
                                </Form.Label>
                                <Col sm={4}>
                                    <Form.Control type="text" name="userId" value={userId} onChange={(e) => handleChange(e)} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="title">
                                <Form.Label column sm={2}>
                                    Title
                                </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type="text" name="title" value={title} onChange={(e) => handleChange(e)} />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={updateAlbumFunc}>Save Changes</Button>
                </Modal.Footer>
                {alertShow ?
                    <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                        < Alert.Heading > Updation of newly added albums is not supported by the API right now </Alert.Heading>
                        <p>
                            Please try again later.
                        </p>
                    </Alert >
                    :
                    ""}
            </Modal >
        </>
    );
}

export default UpdateAlbumModal;