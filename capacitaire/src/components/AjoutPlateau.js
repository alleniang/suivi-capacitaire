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

    const [programme, setProgramme] = useState([])
    const formik = useFormik({
        initialValues: {
            libelle: 'ssssss',
            operation: '',
            site: '',
            capacite: '',
            boxes: '',
            positions: '',
            positionsOK: '',

        },
        onSubmit: values => {
            axios.post(`${serverUrl}/plateau/AjoutPlateau`, values)
                .then(res => console.log(res.data));

            console.log(values)
            alert(JSON.stringify(values, null, 2));
        },
    })
    useEffect(() => {
        axios.get(`${serverUrl}/operation/ListOperation`)
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
                        onChange={formik.handleChange}
                        required
                    />
                    &nbsp;&nbsp;
                    <FormControl sx={{ minWidth: 222 }}>
                        <InputLabel id="programme">Opération*</InputLabel>
                        <Select
                            labelId="operation"
                            id="operation"
                            size="small"
                            variant="outlined"
                            label="operation"
                            onChange={formik.handleChange}
                            name="operation"
                            required
                        >
                            {programme.map(p => <MenuItem key={p._id} value={p._id}>{p.libelle}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <FormControl sx={{ m: 0, minWidth: 222 }}>
                        <InputLabel id="site">Site*</InputLabel>
                        <Select
                            labelId="site"
                            id="site"
                            size="small"
                            variant="outlined"
                            label="site"
                            onChange={formik.handleChange}
                            name="site"
                            required
                        >
                            <MenuItem value="4C">4C</MenuItem>
                            <MenuItem value="PA">PA</MenuItem>
                        </Select>
                    </FormControl>
                    &nbsp;&nbsp;

                    <TextField
                        id="capacite"
                        label="Capacité"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        required
                    />
                    <br />
                    <br />
                    <TextField
                        id="boxes"
                        label="Boxes"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        required
                    />
                    &nbsp;&nbsp;
                    <TextField
                        id="positions"
                        label="Positions"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        required
                    />
                    <br />
                    <br />
                    <center>
                        <TextField
                            id="positionsOK"
                            label="Positions OK"
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            required
                        />
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