import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import client from '../api/client';
import { serverUrl } from '../api/params';
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { red, blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { AjoutCapacitaire } from './AjoutCapacitaire';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useFormik, FormikProvider } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

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
    top: '50%',
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

export default function Capacitaire() {
    const [capacitaire, setCapacitaire] = useState([])
    const [operation, setOperation] = useState([])
    const [modalData, setModalData] = useState()

    useEffect(() => {
        async function fetchMyAPI() {

            const listOperation = await client.get(`${serverUrl}/operation/ListOperation`);
            setOperation(listOperation.data);

            const listCapacitaire = await client.get(`${serverUrl}/previsions/Capacitaire/ListCapacitaire`);
            setCapacitaire(listCapacitaire.data);

        }

        fetchMyAPI()

    }, []);

    const getOPById = id => {
        const result = operation.filter(op => op._id === id);
        return result[0].libelle
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        async function fetchMyAPI() {

            const listOperation = await client.get(`${serverUrl}/operation/ListOperation`);
            setOperation(listOperation.data);

            const listCapacitaire = await client.get(`${serverUrl}/previsions/Capacitaire/ListCapacitaire`);
            setCapacitaire(listCapacitaire.data);

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

            const listOperation = await client.get(`${serverUrl}/operation/ListOperation`);
            setOperation(listOperation.data);

            const listCapacitaire = await client.get(`${serverUrl}/previsions/Capacitaire/ListCapacitaire`);
            setCapacitaire(listCapacitaire.data);

        }

        fetchMyAPI()

    };

    const deleteCapacitaire = (row) => {

        if (window.confirm("Voulez vous vraiment supprimer ?")) {
            axios.delete(`${serverUrl}/previsions/Capacitaire/delete-capacitaire/${row._id}`)
                .then(alert(`${row.libelle} supprimé !!!`));

            async function fetchMyAPI() {

                const listOperation = await client.get(`${serverUrl}/operation/ListOperation`);
                setOperation(listOperation.data);

                const listCapacitaire = await client.get(`${serverUrl}/previsions/Capacitaire/ListCapacitaire`);
                setCapacitaire(listCapacitaire.data);

            }

            fetchMyAPI()

        }
    }

    const formik = useFormik({
        initialValues: {
            operation: modalData && modalData.operation,
            capacitaire: modalData && modalData.capacitaire,
            previsions: modalData && modalData.previsions,

        },

        onSubmit: values => {
            axios.put(`${serverUrl}/previsions/Capacitaire/update-Capacitaire/${modalData._id}`, values)
                .then(res => {
                    alert('Modification réussie !');
                });

            async function fetchMyAPI() {

                const listOperation = await client.get(`${serverUrl}/operation/ListOperation`);
                setOperation(listOperation.data);

                const listCapacitaire = await client.get(`${serverUrl}/previsions/Capacitaire/ListCapacitaire`);
                setCapacitaire(listCapacitaire.data);

            }

            fetchMyAPI()

            setOpenM(false);
        },
    })

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
                    <h2 id="parent-modal-title" align="center">Ajouter Prévisions Capacitaire</h2>
                    <p id="parent-modal-description">
                        <AjoutCapacitaire />
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
                    <h2 id="parent-modal-title" align="center">Modifier Prévisions Capacitaire</h2>
                    <p id="parent-modal-description">
                        <FormikProvider value={formik}>
                            <row>

                                <form onSubmit={formik.handleSubmit}>
                                    <FormControl sx={{ m: 0, minWidth: 225 }}>
                                        <InputLabel id="operation">Opération*</InputLabel>
                                        <Select
                                            labelId="operation"
                                            id="operation"
                                            size="small"
                                            variant="outlined"
                                            value={formik.values.operation}
                                            defaultValue={modalData && modalData.operation}
                                            label="Opération"
                                            onChange={formik.handleChange}
                                            name="operation"
                                            required
                                        >
                                            {operation.map(op => <MenuItem key={op._id} value={op._id}>{op.libelle}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <br />
                                    <br />
                                    <TextField
                                        id="capacitaire"
                                        label="Capacitaire"
                                        variant="outlined"
                                        value={formik.values.capacitaire}
                                        defaultValue={modalData && modalData.capacitaire}
                                        size="small"
                                        onChange={formik.handleChange}
                                        required
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        id="previsions"
                                        label="Prévisions"
                                        variant="outlined"
                                        value={formik.values.previsions}
                                        defaultValue={modalData && modalData.previsions}
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
                            </row>
                        </FormikProvider >
                    </p>
                </Box>
            </Modal>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Opération</StyledTableCell>
                            <StyledTableCell >Capacitaire</StyledTableCell>
                            <StyledTableCell >Prévisions</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {capacitaire.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">{getOPById(row.operation)}</StyledTableCell>
                                <StyledTableCell >{row.capacitaire}</StyledTableCell>
                                <StyledTableCell >{row.previsions}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <IconButton aria-label="Edit" >
                                        <EditIcon sx={{ color: blue[500] }} onClick={() => { handleOpenM(row) }} />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => deleteCapacitaire(row)}>
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
