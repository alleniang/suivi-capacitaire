import { Navbar, Nav, Container,  NavDropdown} from 'react-bootstrap';
import Home from './Home';
import w2c from '../assets/way2call.png';
function Navigation () {
    
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/home" onClick={Home}>Mon App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#view">Dashbord</Nav.Link>
                        <Nav.Link href="#news">News</Nav.Link>
                        <NavDropdown title="Capacitaire" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Par business Unit</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Par programme</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Par opération</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Climatisation</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <img src={w2c} alt="way2call"/>
            </Container>
            
        </Navbar>
    )
}

export default Navigation;