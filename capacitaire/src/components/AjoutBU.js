import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {serverUrl} from '../api/params';

console.log("OK")


export const AjoutBU = () => {


    const [libelle, setLibelle] = useState()

    const onChangeLibelle = (e) => setLibelle(e.target.value)


    const onSubmit = e => {

        const businessUnitObject = {
            libelle
        }

        axios.post(`${serverUrl}/businessUnit/AjoutBU`, businessUnitObject)
            .then(res => {
                let response = res.data;
                alert(response.message);
            });

        setLibelle('')
        e.preventDefault()
    }
    return (
        <div className="form-wrapper">
            <br />

            <Form onSubmit={onSubmit}>

                <Form.Group controlId="Libelle">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-2"><Form.Label>Libellé</Form.Label></div>
                            <div className="col-md-7"><Form.Control  type="text" value={libelle} onChange={onChangeLibelle} required/></div>
                        </div>
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-7 mt-4">
                                <Button variant="primary" size="lg" block="block" type="submit">
                                    Ajouter Business Unit
                                </Button>
                            </div>
                        </div>
                    </div>

                </Form.Group>



            </Form>

        </div>

    );
}