import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Navbar } from 'react-bootstrap';
import client from '../api/client';
import {serverUrl} from '../api/params';


export default function ListProgramme () {
    const [programmes, setProgrammes] = useState([])
    const [bu, setBu] = useState([])


    useEffect(() => {
        async function fetchMyAPI() {

        const listBu = await client.get(`${serverUrl}/businessUnit/ListBU`);
        setBu(listBu.data);

        const listProgram = await client.get(`${serverUrl}/programme/ListProgramme`);
        setProgrammes(listProgram.data);
        }

        fetchMyAPI()

    }, []); 

    const getBUById = id => {
        const result = bu.filter(b => b._id === id);
        return result[0].libelle
    }



    return (
        <div className="form-wrapper">
            <Navbar bg="dark" variant="dark">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Libellé</th>
                            <th>Business Unit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programmes.map(programme =>
                            < tr key={programme._id} >
                                <td>{programme.libelle}</td>
                                <td>
                                    {getBUById(programme.bU)}
                                </td>
                                <td>Modifier - Supprimer</td>
                            </tr>)}
                    </tbody>
                </Table>
            </Navbar>
        </div >
    );
}