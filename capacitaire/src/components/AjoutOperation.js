import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {serverUrl} from '../api/params';

export const AjoutOperation = () => {
    const [libelle, setLibelle] = useState()
    const [prog, setProg] = useState([])
    const [programme, setProgramme] = useState()

    const onChangeLibelle = (e) => setLibelle(e.target.value)
    const onChangeProgramme = (e) => setProgramme(e.target.value)


    const onSubmit = e => {

        const operationObject = {
            libelle,
            programme,
        }

        console.log(`Operation successfully created!`);
        console.log(`libelle: ${libelle}`);
        console.log(`programme: ${programme}`);

        axios.post(`${serverUrl}/operation/AjoutOperation`, operationObject)
            .then(res => console.log(res.data));

        setLibelle('')
        setProgramme('')
        setProg([])
        e.preventDefault()
    }


    useEffect(() => {
        axios.get(`${serverUrl}/programme/ListProgramme`)
            .then(res => setProg(res.data));
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

                <Form.Group controlId="Programme">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-3"><Form.Label>Programme</Form.Label></div>
                            <div className="col-md-7">
                                <Form.Select onChange={onChangeProgramme}>
                                    <option>--Choisir Programme--</option>
                                    {prog.map(a => <option key={a._id} value={a._id}>{a.libelle}</option>)}
                                </Form.Select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-7 mt-4">
                                <Button variant="primary" size="lg" block="block" type="submit">
                                    Ajouter Opération
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form.Group>

            </Form>

        </div>

    );
}