import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Navbar } from 'react-bootstrap';
import client from '../api/client';
import {serverUrl} from '../api/params';


export default function ListOperation () {
    const [operation, setOperation] = useState([])
    const [programme, setProgramme] = useState([])


    useEffect(() => {
        async function fetchMyAPI() {

        const listProg = await client.get(`${serverUrl}/programme/ListProgramme`)
        setProgramme(listProg.data);

        const listOp = await client.get(`${serverUrl}/operation/ListOperation`)
        setOperation(listOp.data);
        }

        fetchMyAPI()
    

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    const getBUById = id => {
        const result = programme.filter(p => p._id === id);
        return result[0].libelle
    }



    return (
        <div className="form-wrapper">
            <Navbar bg="dark" variant="dark">
                <Table striped bordered hover variant="dark">

                    <thead>
                        <tr>
                            <th>Libellé</th>
                            <th>Programme</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operation.map(o =>
                            <tr key={o._id}>
                                <td>{o.libelle}</td>
                                <td>
                                    {getBUById(o.programme)}
                                </td>
                                <td>Modifier - Supprimer</td>
                            </tr>)}
                    </tbody>
                </Table>
            </Navbar>
        </div >
    );
}