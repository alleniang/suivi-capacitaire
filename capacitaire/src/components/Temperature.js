import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import client from '../api/client';
import { serverUrl } from '../api/params';
import { useFormik, FormikProvider } from 'formik';
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { red, blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { AjoutReleve } from './AjoutReleve';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "blue",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid blue',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function Temperature() {
    const [temperature, setTemperature] = useState([])
    const [plateau, setPlateau] = useState([])
    const [modalData, setModalData] = useState()

    useEffect(() => {
        async function fetchMyAPI() {

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            setPlateau(listPlateau.data);

            const listTemperature = await client.get(`${serverUrl}/releveTemp/ListReleve`);
            setTemperature(listTemperature.data);
        }

        fetchMyAPI()

    }, []);

    const getPlById = id => {
        const result = plateau.filter(pl => pl._id === id);
        return result[0].libelle
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        async function fetchMyAPI() {

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            setPlateau(listPlateau.data);

            const listTemperature = await client.get(`${serverUrl}/releveTemp/ListReleve`);
            setTemperature(listTemperature.data);
        }

        fetchMyAPI()

    };

    const [openM, setOpenM] = React.useState(false);
    const handleOpenM = (row) => {
        setModalData(row)
        setOpenM(true);
    };

    const handleCloseM = () => {
        setOpenM(false);
        async function fetchMyAPI() {

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            setPlateau(listPlateau.data);

            const listTemperature = await client.get(`${serverUrl}/releveTemp/ListReleve`);
            setTemperature(listTemperature.data);

        }

        fetchMyAPI()

    };

    const deleteTemp = (row) => {

        const result = plateau.some(p => p.bU === row._id)
        if (!result) {
            if (window.confirm("Voulez vous vraiment supprimer ?")) {
                axios.delete(`${serverUrl}/releveTemp/delete-releve/${row._id}`)
                    .then(alert(`${row.libelle} supprimé !!!`));
                axios.get(`${serverUrl}/releveTemp/ListReleve`)
                    .then(res => setTemperature(res.data));
            }
        }

    }

    const formik = useFormik({
        initialValues: {
            date: modalData && modalData.date,
            plateau: modalData && modalData.plateau,
            temperature: modalData && modalData.temperature,
        },

        onSubmit: values => {
            var mois = value.getMonth()
            mois += 1
            values.date = value.getDate() + "-" + mois + "-" + value.getFullYear();
            axios.put(`${serverUrl}/releveTemp/update-releve/${modalData._id}`, values)
                .then(res => {
                    alert('Modification réussie !');
                });

            async function fetchMyAPI() {

                const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
                setPlateau(listPlateau.data);

                const listTemperature = await client.get(`${serverUrl}/releveTemp/ListReleve`);
                setTemperature(listTemperature.data);

            }

            fetchMyAPI()

            setOpenM(false);
        },
    })

    const [value, setValue] = useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div align="right"><Button sx={{ color: blue[900] }} onClick={handleOpen}>Ajouter</Button></div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <div align="right"><Button onClick={handleClose}><CloseIcon sx={{ color: blue[500] }} /></Button></div>
                    <h2 id="parent-modal-title" align="center">Ajouter Relevé</h2>
                    <p id="parent-modal-description">
                        <AjoutReleve />
                    </p>

                </Box>
            </Modal>
            <Modal
                open={openM}
                onClose={handleCloseM}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <div align="right"><Button onClick={handleCloseM}><CloseIcon sx={{ color: blue[500] }} /></Button></div>
                    <h2 id="parent-modal-title" align="center">Modifier Opération</h2>
                    <p id="parent-modal-description">
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
                                            renderInput={(params) => <TextField {...params} />}
                                            required
                                        />
                                    </LocalizationProvider>
                                    <br />
                                    <br />
                                    <FormControl sx={{ m: 0, minWidth: 262 }}>
                                        <InputLabel id="programme">Plateau*</InputLabel>
                                        <Select
                                            labelId="plateau"
                                            id="plateau"
                                            size="small"
                                            variant="outlined"
                                            value={formik.values.plateau}
                                            defaultValue={modalData && modalData.plateau}
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
                                    <TextField sx={{ m: 0, minWidth: 262 }}
                                        id="temperature"
                                        label="Temperature"
                                        variant="outlined"
                                        value={formik.values.temperature}
                                        defaultValue={modalData && modalData.temperature}
                                        size="small"
                                        onChange={formik.handleChange}
                                        required
                                    />
                                    <br />
                                    <br />
                                    <center>
                                        <Button type="submit" variant="contained" size="medium">
                                            Modifier
                                        </Button>
                                    </center>
                                </form>
                            </row>
                        </FormikProvider >
                    </p>
                </Box>
            </Modal>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell >Plateau</StyledTableCell>
                            <StyledTableCell >Température</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {temperature.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.date}
                                </StyledTableCell>
                                <StyledTableCell >{getPlById(row.plateau)}</StyledTableCell>
                                <StyledTableCell >{row.temperature} °C</StyledTableCell>
                                <StyledTableCell align="right">
                                    <IconButton aria-label="Edit" >
                                        <EditIcon sx={{ color: blue[500] }} onClick={() => { handleOpenM(row) }}/>
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => deleteTemp(row)}>
                                        <DeleteIcon sx={{ color: red[400] }} />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
