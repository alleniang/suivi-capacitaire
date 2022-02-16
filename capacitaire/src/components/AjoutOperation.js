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

export const AjoutOperation = () => {

    const [programme, setProgramme] = useState([])
    const formik = useFormik({
        initialValues: {
            libelle: '',
            programme: '',

        },
        onSubmit: (values, { resetForm }) => {
            axios.post(`${serverUrl}/operation/AjoutOperation`, values)
                .then(res => alert('Opération ajoutée !'));
            resetForm({ values: '' });
            //console.log(values)
            //alert(JSON.stringify(values, null, 2));
        },
    })
    useEffect(() => {
        axios.get(`${serverUrl}/programme/ListProgramme`)
            .then(res => setProgramme(res.data));
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
                        <InputLabel id="programme">Programme*</InputLabel>
                        <Select
                            labelId="programme"
                            id="programme"
                            size="small"
                            variant="outlined"
                            label="programme"
                            value={formik.values.programme}
                            onChange={formik.handleChange}
                            name="programme"
                            required
                        >
                            {programme.map(p => <MenuItem key={p._id} value={p._id}>{p.libelle}</MenuItem>)}
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