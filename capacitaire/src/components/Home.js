import Table from 'react-bootstrap/Table';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { BrowserRouter as Link } from "react-router-dom";

const Home = () => {
    return (
        <Container>
            <Navbar bg="dark" variant="dark">

                <Navbar.Brand>
                    <Link to={"/AjoutPlateau"} className="nav-link">
                        Tous les plateaux
                    </Link>
                </Navbar.Brand>

                <Nav className="justify-content-end">
                    <Nav>
                        <Link to={"/AjoutPlateau"} className="nav-link">
                            Ajout Plateau
                        </Link>
                    </Nav>

                    <Nav>
                        <Link to={"/EditPlateau/:id"} className="nav-link">
                            Modifier Plateau
                        </Link>
                    </Nav>

                    <Nav>
                        <Link to={"/ListPlateau"} className="nav-link">
                            Liste Plateau
                        </Link>
                    </Nav>
                </Nav>
            </Navbar>
            <br />
            <Navbar bg="dark" variant="dark">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </Navbar>
       
        </Container >

    )
}
export default Home;
