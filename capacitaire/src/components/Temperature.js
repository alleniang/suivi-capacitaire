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
import { AjoutReleve } from './AjoutReleve';
import CloseIcon from '@mui/icons-material/Close';


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
                                <StyledTableCell align="right"><EditIcon sx={{ color: blue[500] }} /><DeleteIcon sx={{ color: red[400] }} /></StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
