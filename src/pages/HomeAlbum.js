import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useEffect, useState } from "react";
import { getAllAlbums, deleteAlbum } from "../api";
import { UpdateAlbumModal } from "./index";
import { Link } from "react-router-dom";
import { useAlbums } from "../hooks";
import '../styles/HomeAlbum.css'
import { Spinner } from "react-bootstrap";


function HomeAlbum() {

    // albums from context
    const albumsFromState = useAlbums();

    // hooks for setting albums
    let [albums, setAlbums] = useState([]);
    const [albumId, setAlbumId] = useState("");

    // modal hooks for update album modal
    const [modalShow, setModalShow] = useState(false);

    // toast hooks
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const toggleUpdateSuccess = () => setUpdateSuccess(!updateSuccess);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const toggleDeleteSuccess = () => setDeleteSuccess(!deleteSuccess);

    // fetching all Albums
    useEffect(() => {
        const fetchAllAlbums = async () => {
            const response = await getAllAlbums();
            if (response.success) {
                setAlbums(response.data);
            }
        }
        fetchAllAlbums();
    }, []);

    // set album id on click of the update button
    function handleUpdateButtonClick(id) {
        setAlbumId(id);
    }

    // set albums to albums from context if not null
    if (albumsFromState.data !== null) {
        albums = albumsFromState.data;
    }

    // delete an album
    async function deleteAlbumFunc(album_id) {
        const response = await deleteAlbum(album_id);
        if (response.success) {
            let updatedAlbums = albums.filter((album) => album.id !== album_id);
            handleChangeInAlbums(updatedAlbums); // set the updated albums in home album page
            toggleDeleteSuccess(); // show delete successfully toast
        } else {
            console.log("Error in deleting in Album", response.message);
        }
    }

    // whenever albums are updated, set in context as well as albums hook
    const handleChangeInAlbums = (updatedAlbums) => {
        albumsFromState.data = updatedAlbums;
        setAlbums(updatedAlbums);
    }

    // albums UI to show in DOM
    const albumsUI = albums
        .sort((a, b) => a.id - b.id) // sort albums according to id in ascending order
        .map((album, index) => {
            return (
                <tr key={album.id}>
                    <td className="fs-4">{album.userId}</td>
                    <td className="d-flex">
                        <div className="p-2 flex-grow-1 fs-4 title-div">
                            {album.title}
                        </div>
                        <div className="p-2">
                            <Button className="text-center" onClick={() => { setModalShow(true); handleUpdateButtonClick(album.id) }}>Update</Button>
                        </div>
                        <div className="p-2">
                            <Button className="text-center" variant="danger" onClick={() => deleteAlbumFunc(album.id)}>Delete</Button>
                        </div>
                    </td>
                </tr >
            )

        });

    // show spinner while API is loading data
    const loadingAlbums = (
        <tr>
            <td colSpan="4" className="text-center">
                <Spinner animation="border" variant="primary" style={{ width: "10rem", height: "10rem" }}></Spinner>
            </td>
        </tr>
    )


    return (
        <>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Album Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {albumsUI.length > 0 ? albumsUI : loadingAlbums}
                    </tbody>

                </Table>
                <UpdateAlbumModal
                    albumId={albumId}
                    albums={albums}
                    handleChangeInAlbums={handleChangeInAlbums}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    toggleUpdateSuccess={toggleUpdateSuccess}

                />
            </div>
            {/* updated successfully Toast  */}
            <ToastContainer className="p-3" position="top-end" containerPosition="fixed">
                <Toast show={updateSuccess} onClose={toggleUpdateSuccess} bg="light" delay={2000} autohide>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">React-Albums</strong>
                    </Toast.Header>
                    <Toast.Body className="light">Album updated successfully!</Toast.Body>
                </Toast>
            </ToastContainer>

            {/* deleted successfully Toast  */}
            <ToastContainer className="p-3" position="top-end" containerPosition="fixed">
                <Toast show={deleteSuccess} onClose={toggleDeleteSuccess} bg="light" delay={2000} autohide>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">React-Albums</strong>
                    </Toast.Header>
                    <Toast.Body className="light">Album deleted successfully!</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}
export default HomeAlbum;