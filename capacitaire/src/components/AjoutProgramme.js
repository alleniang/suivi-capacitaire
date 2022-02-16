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

export const AjoutProgramme = () => {

    const [businessUnit, setBusinessUnit] = useState([])
    const formik = useFormik({
        initialValues: {
            libelle: '',
            bU: '',

        },
        onSubmit: (values, { resetForm }) => {
            axios.post(`${serverUrl}/programme/AjoutProgramme`, values)
                .then(res => alert('Programme ajouté !'));
            resetForm({ values: '' });
            //console.log(values)
            //alert(JSON.stringify(values, null, 2));
        },
    })
    useEffect(() => {
        axios.get(`${serverUrl}/businessUnit/ListBU`)
            .then(res => setBusinessUnit(res.data));
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
                        <InputLabel id="bU">Business Unit*</InputLabel>
                        <Select
                            labelId="bU"
                            id="bU"
                            size="small"
                            variant="outlined"
                            label="Business Unit"
                            value={formik.values.bU}
                            onChange={formik.handleChange}
                            name="bU"
                            required
                        >
                            {businessUnit.map(b => <MenuItem key={b._id} value={b._id}>{b.libelle}</MenuItem>)}
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