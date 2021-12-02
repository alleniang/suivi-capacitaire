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
import { serverUrl } from '../api/params';
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { red, blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { AjoutBU } from './AjoutBU';
//import { EditBU } from './EditBU';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


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

export default function BusinessUnit() {
    const [bu, setBu] = useState([])
    const [programme, setProgramme] = useState([])


    useEffect(() => {
        axios.get(`${serverUrl}/businessUnit/ListBU`)
            .then(res => setBu(res.data));

        axios.get(`${serverUrl}/programme/ListProgramme`)
            .then(res => setProgramme(res.data));
    }, []);

    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

        axios.get(`${serverUrl}/businessUnit/ListBU`)
            .then(res => setBu(res.data));
    };

    const deleteBU = (row) => {

        const result = programme.some(p => p.bU === row._id)
        if (!result) {
            if (window.confirm("Voulez vous vraiment supprimer ?")) {
                axios.delete(`${serverUrl}/businessUnit/delete-Bu/${row._id}`)
                    .then(alert(`${row.libelle} supprimé !!!`));
                axios.get(`${serverUrl}/businessUnit/ListBU`)
                    .then(res => setBu(res.data));
            }
        }
    
    }
    

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
                    <h2 id="parent-modal-title" align="center">Ajouter Business Unit</h2>
                    <p id="parent-modal-description">
                        <AjoutBU />
                    </p>

                </Box>
            </Modal>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Libellé Business Unit</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bu.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.libelle}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <IconButton aria-label="Edit" >
                                        <EditIcon sx={{ color: blue[500] }} />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => deleteBU(row)}>
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
