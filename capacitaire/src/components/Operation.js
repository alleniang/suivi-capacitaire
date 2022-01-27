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
import { useFormik, FormikProvider } from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { red, blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { AjoutOperation } from './AjoutOperation';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


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

export default function Programme() {
    const [programme, setProgramme] = useState([])
    const [operation, setOperation] = useState([])
    const [modalData, setModalData] = useState()
    const [plateau, setPlateau] = useState([])
    const [capacitaire, setCapacitaire] = useState([])
    const [appels, setAppels] = useState([])


    useEffect(() => {
        async function fetchMyAPI() {

            const listProgram = await client.get(`${serverUrl}/programme/ListProgramme`);
            setProgramme(listProgram.data);

            const listOperation = await client.get(`${serverUrl}/operation/ListOperation`);
            setOperation(listOperation.data);

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            setPlateau(listPlateau.data);

            const listCapacitaire = await client.get(`${serverUrl}/previsions/Capacitaire/ListCapacitaire`);
            setCapacitaire(listCapacitaire.data);

            const listAppels = await client.get(`${serverUrl}/previsions/Appels/ListAppels`);
            setAppels(listAppels.data);

        }

        fetchMyAPI()

    }, []);

    const getProgrammeById = id => {
        const result = programme.filter(p => p._id === id);
        return result[0].libelle
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        async function fetchMyAPI() {

            const listProgram = await client.get(`${serverUrl}/programme/ListProgramme`);
            setProgramme(listProgram.data);

            const listOperation = await client.get(`${serverUrl}/operation/ListOperation`);
            setOperation(listOperation.data);

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            setPlateau(listPlateau.data);
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

            const listProgram = await client.get(`${serverUrl}/programme/ListProgramme`);
            setProgramme(listProgram.data);

            const listOperation = await client.get(`${serverUrl}/operation/ListOperation`);
            setOperation(listOperation.data);

        }

        fetchMyAPI()

    };

    const deleteOperation = (row) => {

        const result1 = plateau.some(pl => pl.operation === row._id)
        const result2 = capacitaire.some(c => c.operation === row._id)
        const result3 = appels.some(a => a.operation === row._id)
        if (!result1 && !result2 && !result3) {
            if (window.confirm("Voulez vous vraiment supprimer ?")) {
                axios.delete(`${serverUrl}/operation/delete-Operation/${row._id}`)
                    .then(alert(`${row.libelle} supprimé !!!`));

                async function fetchMyAPI() {

                    const listProgram = await client.get(`${serverUrl}/programme/ListProgramme`);
                    setProgramme(listProgram.data);

                    const listOperation = await client.get(`${serverUrl}/operation/ListOperation`);
                    setOperation(listOperation.data);

                    const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
                    setPlateau(listPlateau.data);
                }

                fetchMyAPI()

            }
        }

    }

    const formik = useFormik({
        initialValues: {
            libelle: modalData && modalData.libelle,
            programme: modalData && modalData.programme,
        },

        onSubmit: values => {
            axios.put(`${serverUrl}/operation/update-Operation/${modalData._id}`, values)
                .then(res => {
                    alert('Modification réussie !');
                });

            async function fetchMyAPI() {

                const listProgram = await client.get(`${serverUrl}/programme/ListProgramme`);
                setProgramme(listProgram.data);

                const listOperation = await client.get(`${serverUrl}/operation/ListOperation`);
                setOperation(listOperation.data);

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
                    <h2 id="parent-modal-title" align="center">Ajouter Opération</h2>
                    <p id="parent-modal-description">
                        <AjoutOperation />
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
                                    <TextField
                                        id="libelle"
                                        label="Libelle"
                                        variant="outlined"
                                        value={formik.values.libelle}
                                        defaultValue={modalData && modalData.libelle}
                                        size="small"
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
                                            value={formik.values.programme}
                                            defaultValue={modalData && modalData.programme}
                                            label="programme"
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
                            <StyledTableCell>Libellé Operation</StyledTableCell>
                            <StyledTableCell >Programme</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {operation.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.libelle}
                                </StyledTableCell>
                                <StyledTableCell >{getProgrammeById(row.programme)}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <IconButton aria-label="Edit" >
                                        <EditIcon sx={{ color: blue[500] }} onClick={() => { handleOpenM(row) }} />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => deleteOperation(row)}>
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
