import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from 'axios';
import { Navbar } from 'react-bootstrap';
import {serverUrl} from '../api/params';


export default function ListBu () {
    const [bu, setBu] = useState([])

    useEffect(() => {
        axios.get(`${serverUrl}/businessUnit/ListBU`)
            .then(res => setBu(res.data));
    },[]);

    return (
        <div className="form-wrapper">
            <Navbar bg="dark" variant="dark">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Libellé</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bu.map(a =>
                                <tr key={a._id}>
                                    <td>{a.libelle}</td>
                                    <td>Modifier - Supprimer</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Navbar>
        </div>

    );
}