import React from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {serverUrl} from '../api/params';
import axios from 'axios';

export const AjoutBU = () => {
    
    const formik = useFormik({
        initialValues: {
            libelle: '',

        },
        onSubmit: values => {
            axios.post(`${serverUrl}/businessUnit/AjoutBU`, values)
            .then(res => {
                let response = res.data;
                alert(response.message);
            });
            console.log(values)
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                id="libelle"
                label="Libelle"
                variant="outlined"
                size="small"
                onChange={formik.handleChange}
                required
            />
            <br />
            <br />
            <center>
                <Button type="submit" variant="contained" size="medium">
                    Ajouter
                </Button>
            </center>
        </form>
    );
};