
import * as React from 'react';
import axios from 'axios';
import { serverUrl } from '../api/params';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';


import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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

export const EditBU = (id) => {
    const [bu, setBu] = useState([])

    useEffect(() => {
        axios.get(`${serverUrl}/businessUnit/ListBU`)
            .then(res => setBu(res.data));
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

    const getBUById = id => {
        const result = bu.filter(b => b._id === id);
        return result[0].libelle
    }
    handleOpen()
    return(
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <div align="right"><Button onClick={handleClose}><CloseIcon sx={{ color: blue[500] }} /></Button></div>
                    <h2 id="parent-modal-title" align="center">Modifier Business Unit</h2>
                    <p id="parent-modal-description">
                        
                    </p>

                </Box>
            </Modal>
        </div>
    )
}