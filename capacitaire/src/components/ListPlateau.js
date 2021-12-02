import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Navbar } from 'react-bootstrap';
import client from '../api/client';
import {serverUrl} from '../api/params';


export default function ListPlateau () {
    const [plateau, setPlateau] = useState([]);
    const [operation, setOperation] = useState([]);


    useEffect(() => {
        async function fetchMyAPI() {

            const listOp = await client.get(`${serverUrl}/operation/ListOperation`);
            setOperation(listOp.data);

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            setPlateau(listPlateau.data);
            
        }

        fetchMyAPI()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getBUById = id => {
        const result = operation.filter(o => o._id === id);
        return result[0].libelle
    }



    return (
        <div className="form-wrapper">
            <Navbar bg="dark" variant="dark">
                <Table striped bordered hover variant="dark">

                    <thead>
                        <tr>
                            <th>Libellé</th>
                            <th>Opération</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plateau.map(p =>
                            < tr key={p._id}>
                                <td>{p.libelle}</td>
                                <td>
                                    {getBUById(p.operation)}
                                </td>
                                <td>Modifier - Supprimer</td>
                            </tr>)}
                    </tbody>
                </Table>
            </Navbar>
        </div >
    );
}