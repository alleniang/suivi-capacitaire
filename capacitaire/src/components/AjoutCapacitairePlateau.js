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
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export const AjoutCapacitairePlateau = () => {

    const [plateau, setPlateau] = useState([])
    const formik = useFormik({
        initialValues: {
            date: '',
            plateau: '',
            site: '',
            capacite: '',
            boxes: '',
            positions: '',
            positionsOK: '',

        },
        onSubmit: values => {
            var mois = value.getMonth()
            mois += 1
            values.date = value.getDate() + "-" + mois + "-" + value.getFullYear();
            axios.post(`${serverUrl}/capacitairePlateau/AjoutCapacitairePlateau`, values)
                .then(res => console.log(res.data));
            console.log(values)
            alert(JSON.stringify(values, null, 2));
        },
    })
    useEffect(() => {
        axios.get(`${serverUrl}/plateau/ListPlateau`)
            .then(res => setPlateau(res.data));
    }, []);

    const [value, setValue] = useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    }

    return (
        <FormikProvider value={formik}>
            <row>

                <form onSubmit={formik.handleSubmit}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker 
                            id="date"
                            label="Date relevé"
                            inputFormat="dd/MM/yyyy"
                            size="small"
                            value={value}
                            name="date"
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                            required
                        />
                    </LocalizationProvider>
                    &nbsp;&nbsp;
                    <FormControl sx={{ minWidth: 190 }}>
                        <InputLabel id="plateau">Plateau*</InputLabel>
                        <Select
                            labelId="plateau"
                            id="plateau"
                            size="small"
                            variant="outlined"
                            label="plateau"
                            onChange={formik.handleChange}
                            name="plateau"
                            required
                        >
                            {plateau.map(p => <MenuItem key={p._id} value={p._id}>{p.libelle}</MenuItem>)}
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