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
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { AjoutPlateau } from './AjoutPlateau';
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

export default function Plateau() {
    const [plateau, setPlateau] = useState([])
    const [operation, setOperation] = useState([])
    const [modalData, setModalData] = useState()


    useEffect(() => {
        async function fetchMyAPI() {

            const listOperation = await client.get(`${serverUrl}/operation/ListOperation`);
            setOperation(listOperation.data);

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            setPlateau(listPlateau.data);
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

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            setPlateau(listPlateau.data);
        }

        fetchMyAPI()

    };

    const [openM, setOpenM] = React.useState(false);
    const handleOpenM = (row) => {
        //console.log(row)
        setModalData(row)
        setOpenM(true);
    };

    const handleCloseM = () => {
        setOpenM(false);
        async function fetchMyAPI() {

            const listOperation = await client.get(`${serverUrl}/operation/ListOperation`);
            setOperation(listOperation.data);

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            setPlateau(listPlateau.data);
        }

        fetchMyAPI()

    };


    const deletePlateau = (row) => {

        if (window.confirm("Voulez vous vraiment supprimer ?")) {
            axios.delete(`${serverUrl}/plateau/delete-Plateau/${row._id}`)
                .then(alert(`${row.libelle} supprimé !!!`));

            async function fetchMyAPI() {

                const listOperation = await client.get(`${serverUrl}/operation/ListOperation`);
                setOperation(listOperation.data);

                const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
                setPlateau(listPlateau.data);
            }

            fetchMyAPI()

        }

    }
    const formik = useFormik({
        initialValues: {
            libelle: modalData && modalData.libelle,
            operation: '',
            site: '',
            capacite: '',
            boxes: '',
            positions: '',
            positionsOK: '',
        },
        
        onSubmit: values => {
            axios.post(`${serverUrl}/plateau/hh`, values)
                .then(res => console.log(res.data));

            console.log(values)
            alert(JSON.stringify(values, null, 2));
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
                <Box sx={{ ...style, width: 530 }}>
                    <div align="right"><Button onClick={handleClose}><CloseIcon sx={{ color: blue[500] }} /></Button></div>
                    <h2 id="parent-modal-title" align="center">Ajouter Plateau</h2>
                    <p id="parent-modal-description">
                        <AjoutPlateau />
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
                    <h2 id="parent-modal-title" align="center">Modifier Plateau</h2>
                    <p id="parent-modal-description">
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
                                            {operation.map(op => <MenuItem key={op._id} value={op._id}>{op.libelle}</MenuItem>)}
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
                            <StyledTableCell>Libellé Plateau</StyledTableCell>
                            <StyledTableCell >Opération</StyledTableCell>
                            <StyledTableCell >Site</StyledTableCell>
                            <StyledTableCell >Capacité</StyledTableCell>
                            <StyledTableCell >Boxes</StyledTableCell>
                            <StyledTableCell >Positions</StyledTableCell>
                            <StyledTableCell >Positions OK</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {plateau.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.libelle}
                                </StyledTableCell>
                                <StyledTableCell >{getOPById(row.operation)}</StyledTableCell>
                                <StyledTableCell >{row.site}</StyledTableCell>
                                <StyledTableCell >{row.capacite}</StyledTableCell>
                                <StyledTableCell >{row.boxes}</StyledTableCell>
                                <StyledTableCell >{row.positions}</StyledTableCell>
                                <StyledTableCell >{row.positionsOK}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <IconButton aria-label="Edit" onClick={() => handleOpenM(row)}>
                                        <EditIcon sx={{ color: blue[500] }} />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => deletePlateau(row)}>
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
