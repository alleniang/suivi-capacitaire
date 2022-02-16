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


export const AjoutClim = () => {

    const [plateau, setPlateau] = useState([])
    const formik = useFormik({
        initialValues: {
            libelle: '',
            plateau: '',
            marque: '',
            chevaux: '',
            etat: '',

        },
        onSubmit: (values, { resetForm }) => {
            axios.post(`${serverUrl}/climatiseur/AjoutClimatiseur`, values)
                .then(res => alert('Climatiseur ajouté !'));
            resetForm({ values: '' });
            //console.log(values)
            //alert(JSON.stringify(values, null, 2));
        },
    })
    useEffect(() => {
        axios.get(`${serverUrl}/plateau/ListPlateau`)
            .then(res => setPlateau(res.data));
    }, []);


    return (
        <FormikProvider value={formik}>
            <row>

                <form onSubmit={formik.handleSubmit} >
                    <TextField
                        id="libelle"
                        label="Libellé"
                        variant="outlined"
                        size="small"
                        value={formik.values.libelle}
                        onChange={formik.handleChange}
                        required
                    />
                    &nbsp;&nbsp;
                    <FormControl sx={{ minWidth: 226 }}>
                        <InputLabel id="plateau">Plateau*</InputLabel>
                        <Select
                            labelId="plateau"
                            id="plateau"
                            size="small"
                            variant="outlined"
                            label="plateau"
                            value={formik.values.plateau}
                            onChange={formik.handleChange}
                            name="plateau"
                            required
                        >
                            {plateau.map(p => <MenuItem key={p._id} value={p._id}>{p.libelle}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <TextField
                        id="marque"
                        label="Marque"
                        variant="outlined"
                        size="small"
                        value={formik.values.marque}
                        onChange={formik.handleChange}
                        required
                    />
                    &nbsp;&nbsp;
                    <TextField
                        id="chevaux"
                        label="Chevaux"
                        variant="outlined"
                        size="small"
                        value={formik.values.chevaux}
                        onChange={formik.handleChange}
                        required
                    />
                    <br />
                    <br />
                    <center>
                        <FormControl sx={{ m: 0, minWidth: 226 }}>
                            <InputLabel id="site">Etat*</InputLabel>
                            <Select
                                labelId="etat"
                                id="etat"
                                size="small"
                                variant="outlined"
                                label="etat"
                                value={formik.values.etat}
                                onChange={formik.handleChange}
                                name="etat"
                                required
                            >
                                <MenuItem value="OK">OK</MenuItem>
                                <MenuItem value="KO">KO</MenuItem>
                            </Select>
                        </FormControl>
                    </center>
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