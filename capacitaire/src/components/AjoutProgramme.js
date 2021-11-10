import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {serverUrl} from '../api/params';

export const AjoutProgramme = () => {
    const [libelle, setLibelle] = useState()
    const [businessUnit, setBusinessUnit] = useState([])
    const [bU, setBU] = useState()

    const onChangeLibelle = (e) => setLibelle(e.target.value)
    const onChangeBU = (e) => setBU(e.target.value)


    const onSubmit = e => {

        const programmeObject = {
            libelle,
            bU,
        }

        console.log(`Programme successfully created!`);
        console.log(`libelle: ${libelle}`);
        console.log(`Bu: ${bU}`);

        axios.post(`${serverUrl}/programme/AjoutProgramme`, programmeObject)
            .then(res => console.log(res.data));

        setLibelle('')
        setBU('')
        setBusinessUnit([])
        e.preventDefault()
    }


    useEffect(() => {
        axios.get(`${serverUrl}/businessUnit/ListBU`)
            .then(res => setBusinessUnit(res.data));
    },[]);

    return (
        <div className="form-wrapper">

            <br />

            <Form onSubmit={onSubmit}>

                <Form.Group controlId="Libelle">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-3"><Form.Label>Libellé</Form.Label></div>
                            <div className="col-md-7"><Form.Control type="text" value={libelle} onChange={onChangeLibelle} /></div>
                        </div>
                    </div>
                </Form.Group>

                <Form.Group controlId="BusinessUnit">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-3"><Form.Label>Business Unit</Form.Label></div>
                            <div className="col-md-7">
                                <Form.Select onChange={onChangeBU}>
                                    <option>--Choisir Business Unit--</option>
                                    {businessUnit.map(a => <option key={a._id} value={a._id}>{a.libelle}</option>)}
                                </Form.Select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-7 mt-4">
                                <Button variant="primary" size="lg" block="block" type="submit">
                                    Ajouter Programme
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form.Group>

            </Form>

        </div>

    );
}