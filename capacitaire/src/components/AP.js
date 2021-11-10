import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { Table } from "react-bootstrap";
import axios from 'axios';
//import Plateau from "../../../api/models/Plateau";

export default class AjoutPlateau extends Component {
    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangeNomPlateau = this.onChangeNomPlateau.bind(this);
        this.onChangeSite = this.onChangeSite.bind(this);
        this.onChangeCapacite = this.onChangeCapacite.bind(this);
        this.onChangeNbBoxes = this.onChangeNbBoxes.bind(this);
        this.onChangeBVides = this.onChangeBVides.bind(this);
        this.onChangePositions = this.onChangePositions.bind(this);
        this.onChangePositionsOK = this.onChangePositionsOK.bind(this);
        this.onChangePositionsKO = this.onChangePositionsKO.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            nomPlateau: '',
            site: '',
            capacite: '',
            nbBoxes: '',
            bVides: '',
            positions: '',
            positionsOK: '',
            positionsKO: '',
        }
    }

    onChangeNomPlateau(e) {
        this.setState({ nomPlateau: e.target.value })
    }

    onChangeSite(e) {
        this.setState({ site: e.target.value })
    }

    onChangeCapacite(e) {
        this.setState({ capacite: e.target.value })
    }

    onChangeNbBoxes(e) {
        this.setState({ nbBoxes: e.target.value })
    }

    onChangeBVides(e) {
        this.setState({ bVides: e.target.value })
    }

    onChangePositions(e) {
        this.setState({ positions: e.target.value })
    }
    onChangePositionsOK(e) {
        this.setState({ positionsOK: e.target.value })
    }

    onChangePositionsKO(e) {
        this.setState({ positionsKO: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        
        const plateauObject = {
            nomPlateau: this.state.nomPlateau,
            site: this.state.site,
            capacite: this.state.capacite,
            nbBoxes: this.state.nbBoxes,
            bVides: this.state.bVides,
            positions: this.state.positions,
            positionsOK: this.state.positionsOK,
            positionsKO: this.state.positionsKO
        };

        console.log(`Plateau successfully created!`);
        console.log(`nomPlateau: ${this.state.nomPlateau}`);
        console.log(`site: ${this.state.site}`);
        console.log(`capacite: ${this.state.capacite}`);
        console.log(`nbBoxes: ${this.state.nbBoxes}`);
        console.log(`bVides: ${this.state.bVides}`);
        console.log(`positions: ${this.state.positions}`);
        console.log(`positionsOK: ${this.state.positionsOK}`);
        console.log(`positionsKO: ${this.state.positionsKO}`);

        axios.post('http://localhost:9000/plateaux/AjoutPlateau', plateauObject)
            .then(res => console.log(res.data));

        this.setState({ nomPlateau: '', site: '', capacite: '', nbBoxes: '', bVides: '', positions: '', positionsOK: '', positionsKO: '' })
    }
    render() {
        return (
            <div class="form-wrapper">
                <br />

                <Form onSubmit={this.onSubmit}>

                    <Form.Group controlId="NomPlateau">
                        <Table>
                            <tr>
                                <td><Form.Label>Nom Plateau</Form.Label></td>
                                <td><Form.Control type="text" value={this.state.nomPlateau} onChange={this.onChangeNomPlateau} /></td>
                            </tr>
                        </Table>
                    </Form.Group>

                    <Form.Group controlId="Site">
                        <Table>
                            <tr>
                                <td><Form.Label>Site</Form.Label></td>
                                <td><Form.Control type="text" value={this.state.site} onChange={this.onChangeSite} /></td>
                            </tr>
                        </Table>
                    </Form.Group>

                    <Form.Group controlId="Capacite">
                        <Table>
                            <tr>
                                <td><Form.Label>Capacité</Form.Label></td>
                                <td><Form.Control type="text" value={this.state.capacite} onChange={this.onChangeCapacite} /></td>
                            </tr>
                        </Table>
                    </Form.Group>

                    <Form.Group controlId="NbBoxes">
                        <Table>
                            <tr>
                                <td><Form.Label>Nombre de Boxes</Form.Label></td>
                                <td><Form.Control type="text" value={this.state.nbBoxes} onChange={this.onChangeNbBoxes} /></td>
                            </tr>
                        </Table>
                    </Form.Group>

                    <Form.Group controlId="BVides">
                        <Table>
                            <tr>
                                <td><Form.Label>Boxes Vides</Form.Label></td>
                                <td><Form.Control type="text" value={this.state.bVides} onChange={this.onChangeBVides} /></td>
                            </tr>
                        </Table>
                    </Form.Group>

                    <Form.Group controlId="Positions">
                        <Table>
                            <tr>
                                <td><Form.Label>Nombre de Positions</Form.Label></td>
                                <td><Form.Control type="text" value={this.state.positions} onChange={this.onChangePositions} /></td>
                            </tr>

                        </Table>
                    </Form.Group>

                    <Form.Group controlId="PositionsOK">
                        <Table>
                            <tr>
                                <td><Form.Label>Nombre de Positions OK</Form.Label></td>
                                <td><Form.Control type="text" value={this.state.positionsOK} onChange={this.onChangePositionsOK} /></td>
                            </tr>
                        </Table>
                    </Form.Group>

                    <Form.Group controlId="PositionsKO">
                        <Table>
                            <tr>
                                <td><Form.Label>Nombre de Positions KO</Form.Label></td>
                                <td><Form.Control type="text" value={this.state.positionsKO} onChange={this.onChangePositionsKO} /></td>
                            </tr>
                        </Table>


                    </Form.Group>
                    <Button variant="primary" size="lg" block="block" type="submit">
                        Ajouter Plateau
                    </Button>

                </Form>

            </div>

        );
    }
}