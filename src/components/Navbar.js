import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import reactAlbumsLogo from '../assets/react-albums-logo.jpg'


// navbar component
function myNavbar() {
    return (
        <Navbar bg="primary" variant="dark" sticky='top'>
            <Container>
                <Navbar.Brand>
                    <img
                        alt=""
                        src={reactAlbumsLogo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    React Albums
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/add-album">Add Albums</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}


export default myNavbar;