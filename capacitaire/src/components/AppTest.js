import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import Navigation from './Navigation';
import Home from './Home';

import { BrowserRouter as Router, Switch} from "react-router-dom";

//import AjoutPlateau from "./AjoutPlateau";
//import EditPlateau from "./EditPlateau";
//import ListPlateau from "./ListPlateau";

function AppTest() {
  return (<Router>
    
    <div className="App">
      <Navigation />
      <Home />
      <Container>
        <Row>
          <Col md={4}>
            <div className="wrapper">
              <Switch>
                
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default AppTest;