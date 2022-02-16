import React, { useEffect, useState } from 'react';
import { useFormik, FormikProvider } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { serverUrl } from '../api/params';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


export const AjoutPlateau = () => {

    const [operation, setOperation] = useState([])
    const formik = useFormik({
        initialValues: {
            libelle: '',
            operation: '',

        },
        onSubmit: (values, { resetForm }) => {
            axios.post(`${serverUrl}/plateau/AjoutPlateau`, values)
                .then(res => alert('Plateau ajouté !'));
            resetForm({ values: '' });
            //console.log(values)
            //alert(JSON.stringify(values, null, 2));
        },
    })
    useEffect(() => {
        axios.get(`${serverUrl}/operation/ListOperation`)
            .then(res => setOperation(res.data));
    }, []);

    
    return (
        <FormikProvider value={formik}>
            <row>

                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id="libelle"
                        label="Libelle"
                        variant="outlined"
                        size="small"
                        value={formik.values.libelle}
                        onChange={formik.handleChange}
                        required
                    />
                    <br />
                    <br />
                    <FormControl sx={{ m: 0, minWidth: 225 }}>
                        <InputLabel id="operation">Operation*</InputLabel>
                        <Select
                            labelId="operation"
                            id="operation"
                            size="small"
                            variant="outlined"
                            label="operation"
                            value={formik.values.operation}
                            onChange={formik.handleChange}
                            name="operation"
                            required
                        >
                            {operation.map(op => <MenuItem key={op._id} value={op._id}>{op.libelle}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <center>
                        <Button type="submit" variant="contained" size="medium">
                            Ajouter
                        </Button>
                    </center>
                </form>
            </row>
        </FormikProvider >
    );
};