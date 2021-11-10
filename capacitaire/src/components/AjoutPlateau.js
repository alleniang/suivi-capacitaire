import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {serverUrl} from '../api/params';

export const AjoutPlateau = () => {
    const [libelle, setLibelle] = useState()
    const [op, setOp] = useState([])
    const [operation, setOperation] = useState()
    const [site, setSite] = useState()
    const [capacite, setCapacite] = useState()
    const [boxes, setBoxes] = useState()
    const [positions, setPositions] = useState()
    const [positionsOK, setPositionsOK] = useState()


    const onChangeLibelle = (e) => setLibelle(e.target.value)
    const onChangeOperation = (e) => setOperation(e.target.value)
    const onChangeSite = (e) => setSite(e.target.value)
    const onChangeCapacite = (e) => setCapacite(e.target.value)
    const onChangeBoxes = (e) => setBoxes(e.target.value)
    const onChangePositions = (e) => setPositions(e.target.value)
    const onChangePositionsOK = (e) => setPositionsOK(e.target.value)


    const onSubmit = e => {

        const plateauObject = {
            libelle,
            operation,
            site,
            capacite,
            boxes,
            positions,
            positionsOK,
        }

        console.log(`Plateau successfully created!`);
        console.log(`libelle: ${libelle}`);
        console.log(`operation: ${operation}`);
        console.log(`site: ${site}`);
        console.log(`capacite: ${capacite}`);
        console.log(`boxes: ${boxes}`);
        console.log(`positions: ${positions}`);
        console.log(`positions OK: ${positionsOK}`);

        axios.post(`${serverUrl}/plateau/AjoutPlateau`, plateauObject)
            .then(res => console.log(res.data));

        setLibelle('')
        setOperation('')
        setOp([])
        setSite('')
        setCapacite('')
        setBoxes('')
        setPositions('')
        setPositionsOK('')
        e.preventDefault()
    }


    useEffect(() => {
        axios.get(`${serverUrl}/operation/ListOperation`)
            .then(res => setOp(res.data));
    },[]);


    return (
        <div className="form-wrapper">

            <br />

            <Form onSubmit={onSubmit}>

                <Form.Group controlId="Libelle">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4"><Form.Label>Libellé</Form.Label></div>
                            <div className="col-md-7"><Form.Control type="text" value={libelle} onChange={onChangeLibelle} /></div>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group controlId="Operation">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4"><Form.Label>Operation</Form.Label></div>
                            <div className="col-md-7">
                                <Form.Select onChange={onChangeOperation}>
                                    <option>--Choisir Operation--</option>
                                    {op.map(a => <option key={a._id} value={a._id}>{a.libelle}</option>)}
                                </Form.Select>
                            </div>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group controlId="Site">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4"><Form.Label>Site</Form.Label></div>
                            <div className="col-md-7"><Form.Control type="text" value={site} onChange={onChangeSite} /></div>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group controlId="Capacite">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4"><Form.Label>Capacité</Form.Label></div>
                            <div className="col-md-7"><Form.Control type="text" value={capacite} onChange={onChangeCapacite} /></div>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group controlId="Boxes">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4"><Form.Label>Nombre de boxes</Form.Label></div>
                            <div className="col-md-7"><Form.Control type="text" value={boxes} onChange={onChangeBoxes} /></div>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group controlId="Positions">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4"><Form.Label>Nombre de positions</Form.Label></div>
                            <div className="col-md-7"><Form.Control type="text" value={positions} onChange={onChangePositions} /></div>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group controlId="PositionsOK">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4"><Form.Label>Nombre de positions OK</Form.Label></div>
                            <div className="col-md-7"><Form.Control type="text" value={positionsOK} onChange={onChangePositionsOK} /></div>
                        </div>
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-7 mt-4">
                                <Button variant="primary" size="lg" block="block" type="submit">
                                    Ajouter Plateau
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form.Group>

            </Form>

        </div>

    );
}