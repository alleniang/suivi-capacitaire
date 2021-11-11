import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Sidebar from './Sidebar';
import w2c from '../assets/way2call.png';
import { Switch, Route } from "react-router-dom";

function Navigation() {

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/" onClick={Sidebar}>Mon App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="/Composants">Composants</Nav.Link>
                            <Nav.Link href="/Climatisation">Climatisation</Nav.Link>
                            <NavDropdown title="Capacitaire" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Par business Unit</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Par programme</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Par opération</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Climatisation</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <img src={w2c} alt="way2call" />
                </Container>
            </Navbar>
            <div className="wrapper">
                <Switch>
                    <Route exact path='/' />
                    <Route path="/Composants" component={Sidebar} />
                    <Route path="/Climatisation" component={Sidebar} />
                   
                    
                </Switch>
            </div>
        </div>

    )
}

export default Navigation;