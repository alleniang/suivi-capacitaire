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
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { red, blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { AjoutClim } from './AjoutClim';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
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
    width: 535,
    bgcolor: 'background.paper',
    border: '2px solid blue',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function Climatiseur() {
    const [climatiseur, setClimatiseur] = useState([])
    const [plateau, setPlateau] = useState([])
    const [modalData, setModalData] = useState()


    useEffect(() => {
        async function fetchMyAPI() {

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            setPlateau(listPlateau.data);

            const listClimatiseur = await client.get(`${serverUrl}/climatiseur/ListClimatiseur`);
            setClimatiseur(listClimatiseur.data);
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

            const listClimatiseur = await client.get(`${serverUrl}/climatiseur/ListClimatiseur`);
            setClimatiseur(listClimatiseur.data);
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

            const listClimatiseur = await client.get(`${serverUrl}/climatiseur/ListClimatiseur`);
            setClimatiseur(listClimatiseur.data);
        }

        fetchMyAPI()

    };

    const deleteClim = (row) => {

        if (window.confirm("Voulez vous vraiment supprimer ?")) {
            axios.delete(`${serverUrl}/climatiseur/delete-Climatiseur/${row._id}`)
                .then(alert(`${row.libelle} supprimé !!!`));
            axios.get(`${serverUrl}/climatiseur/ListClimatiseur`)
                .then(res => setClimatiseur(res.data));
        }


    }

    const formik = useFormik({
        initialValues: {
            libelle: modalData && modalData.libelle,
            plateau: modalData && modalData.plateau,
            marque: modalData && modalData.marque,
            chevaux: modalData && modalData.chevaux,
            etat: modalData && modalData.etat,
        },

        onSubmit: values => {
            axios.put(`${serverUrl}/climatiseur/update-Climatiseur/${modalData._id}`, values)
                .then(res => {
                    alert('Modification réussie !');
                });

            async function fetchMyAPI() {

                const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
                setPlateau(listPlateau.data);

                const listClimatiseur = await client.get(`${serverUrl}/climatiseur/ListClimatiseur`);
                setClimatiseur(listClimatiseur.data);

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
                <Box sx={{ ...style, width: 535 }}>
                    <div align="right"><Button onClick={handleClose}><CloseIcon sx={{ color: blue[500] }} /></Button></div>
                    <h2 id="parent-modal-title" align="center">Ajouter Climatiseur</h2>
                    <p id="parent-modal-description">
                        <AjoutClim />
                    </p>

                </Box>
            </Modal>
            <Modal
                open={openM}
                onClose={handleCloseM}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 530 }}>
                    <div align="right"><Button onClick={handleCloseM}><CloseIcon sx={{ color: blue[500] }} /></Button></div>
                    <h2 id="parent-modal-title" align="center">Modifier Climatiseur</h2>
                    <p id="parent-modal-description">
                        <FormikProvider value={formik}>
                            <row>

                                <form onSubmit={formik.handleSubmit} >
                                    <TextField
                                        id="libelle"
                                        label="Libellé"
                                        variant="outlined"
                                        value={formik.values.libelle}
                                        defaultValue={modalData && modalData.libelle}
                                        size="small"
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
                                    <TextField
                                        id="marque"
                                        label="Marque"
                                        variant="outlined"
                                        value={formik.values.marque}
                                        defaultValue={modalData && modalData.marque}
                                        size="small"
                                        onChange={formik.handleChange}
                                        required
                                    />
                                    &nbsp;&nbsp;
                                    <TextField
                                        id="chevaux"
                                        label="Chevaux"
                                        variant="outlined"
                                        value={formik.values.chevaux}
                                        defaultValue={modalData && modalData.chevaux}
                                        size="small"
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
                                                value={formik.values.etat}
                                                defaultValue={modalData && modalData.etat}
                                                label="etat"
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
                    </p>
                </Box>
            </Modal>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Libellé</StyledTableCell>
                            <StyledTableCell>Plateau</StyledTableCell>
                            <StyledTableCell >Marque</StyledTableCell>
                            <StyledTableCell >Chevaux</StyledTableCell>
                            <StyledTableCell >Etat</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {climatiseur.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.libelle}
                                </StyledTableCell>
                                <StyledTableCell >{getPlById(row.plateau)}</StyledTableCell>
                                <StyledTableCell >{row.marque}</StyledTableCell>
                                <StyledTableCell >{row.chevaux}</StyledTableCell>
                                <StyledTableCell >{row.etat}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <IconButton aria-label="Edit" >
                                        <EditIcon sx={{ color: blue[500] }} onClick={() => { handleOpenM(row) }} />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => deleteClim(row)}>
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
