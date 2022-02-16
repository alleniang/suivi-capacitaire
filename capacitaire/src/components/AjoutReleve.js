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
//import { format } from 'date-fns';

export const AjoutReleve = () => {

    const [plateau, setPlateau] = useState([])
    const formik = useFormik({
        initialValues: {
            date: '',
            plateau: '',
            temperature: '',

        },
        onSubmit: (values, { resetForm }) => {
            var mois=value.getMonth()
            mois += 1
            values.date = value.getDate()+"-"+mois+"-"+value.getFullYear();
            axios.post(`${serverUrl}/releveTemp/AjoutReleve`, values)
                .then(res => alert('Relevé ajouté !'));
            resetForm({ values: '' });
            //console.log(values)
            //alert(JSON.stringify(values, null, 2));
        },
    })
    useEffect(() => {
        axios.get(`${serverUrl}/plateau/ListPlateau`)
            .then(res => setPlateau(res.data));
    }, []);

    const [value, setValue] = useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <FormikProvider value={formik}>
            <row>

                <form onSubmit={formik.handleSubmit}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            id="date"
                            label="Date relevé"
                            inputFormat="dd/MM/yyyy"
                            value={value}
                            name="date"
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params}/>}
                            required
                        />
                    </LocalizationProvider>
                    <br />
                    <br />
                    <FormControl sx={{ m: 0, minWidth: 262 }}>
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
                    <TextField sx={{ m: 0, minWidth: 262 }}
                        id="temperature"
                        label="Température"
                        variant="outlined"
                        size="small"
                        value={formik.values.temperature}
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
            </row>
        </FormikProvider >
    );
};