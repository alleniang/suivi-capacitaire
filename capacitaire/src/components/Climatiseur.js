import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import client from '../api/client';
import { serverUrl } from '../api/params';
import Button from '@mui/material/Button';
import { red, blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { AjoutClim } from './AjoutClim';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useFormik, FormikProvider } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';






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

export default function Climatiseur() {

    const [modalData, setModalData] = useState()
    const [rowsData, setRowsData] = useState([])
    const [rowsPl, setRowsPl] = useState([])

    const [openM, setOpenM] = React.useState(false);
    const handleOpenM = (row) => {
        setModalData(row)
        setOpenM(true);
    };

    const handleCloseM = () => {
        setOpenM(false);
        async function fetchMyAPI() {

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            // setPlateau(listPlateau.data);

            const listClimatiseur = await client.get(`${serverUrl}/climatiseur/ListClimatiseur`);
            //setClimatiseur(listClimatiseur.data);

            const getPLById = id => {
                const result = listPlateau.data.filter(p => p._id === id);
                return result[0].libelle
            }


            const rows = [
            ];

            listClimatiseur.data.map((clim, i) => {
                rows[i] = clim;
                rows[i].id = i + 1;
                rows[i].libelle = clim.libelle;
                rows[i].plateau = getPLById(clim.plateau);
                rows[i].marque = clim.marque;
                rows[i].chevaux = clim.chevaux;
                rows[i].etat = clim.etat;
            });

            setRowsData(rows)

            const rowsPlateau = [

            ];

            listPlateau.data.map((plateau, i) => {
                rowsPlateau[i] = plateau;
                rowsPlateau[i].id = plateau._id;

            });

            setRowsPl(rowsPlateau)

        }

        fetchMyAPI()

    };

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'libelle', headerName: 'Libellé' },
        { field: 'plateau', headerName: 'Plateau' },
        { field: 'marque', headerName: 'Marque' },
        { field: 'chevaux', headerName: 'Chevaux', type: 'number' },
        { field: 'etat', headerName: 'Etat' },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params) => (
                <>
                    <IconButton aria-label="Edit" >
                        <EditIcon sx={{ color: blue[500] }} onClick={() => { handleOpenM(params.row) }} />
                    </IconButton>
                    <IconButton aria-label="delete" >
                        <DeleteIcon sx={{ color: red[400] }} onClick={() => deleteClim(params.row)} />
                    </IconButton>
                </>
            ),
        },
    ];

    useEffect(() => {
        async function fetchMyAPI() {

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            // setPlateau(listPlateau.data);

            const listClimatiseur = await client.get(`${serverUrl}/climatiseur/ListClimatiseur`);
            //setClimatiseur(listClimatiseur.data);

            const getPLById = id => {
                const result = listPlateau.data.filter(p => p._id === id);
                return result[0].libelle
            }


            const rows = [
            ];

            listClimatiseur.data.map((clim, i) => {
                rows[i] = clim;
                rows[i].id = i + 1;
                rows[i].libelle = clim.libelle;
                rows[i].plateau = getPLById(clim.plateau);
                rows[i].marque = clim.marque;
                rows[i].chevaux = clim.chevaux;
                rows[i].etat = clim.etat;
            });

            setRowsData(rows)

            const rowsPlateau = [

            ];

            listPlateau.data.map((plateau, i) => {
                rowsPlateau[i] = plateau;
                rowsPlateau[i].id = plateau._id;

            });

            setRowsPl(rowsPlateau)

        }

        fetchMyAPI()

    }, []);

    const options = {
        language: "fr"
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        async function fetchMyAPI() {

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            // setPlateau(listPlateau.data);

            const listClimatiseur = await client.get(`${serverUrl}/climatiseur/ListClimatiseur`);
            //setClimatiseur(listClimatiseur.data);

            const getPLById = id => {
                const result = listPlateau.data.filter(p => p._id === id);
                return result[0].libelle
            }


            const rows = [
            ];

            listClimatiseur.data.map((clim, i) => {
                rows[i] = clim;
                rows[i].id = i + 1;
                rows[i].libelle = clim.libelle;
                rows[i].plateau = getPLById(clim.plateau);
                rows[i].marque = clim.marque;
                rows[i].chevaux = clim.chevaux;
                rows[i].etat = clim.etat;
            });

            setRowsData(rows)

            const rowsPlateau = [

            ];

            listPlateau.data.map((plateau, i) => {
                rowsPlateau[i] = plateau;
                rowsPlateau[i].id = plateau._id;

            });

            setRowsPl(rowsPlateau)
        }

        fetchMyAPI()

    };

    const deleteClim = (row) => {

        if (window.confirm("Voulez vous vraiment supprimer ?")) {
            axios.delete(`${serverUrl}/climatiseur/delete-Climatiseur/${row._id}`)
                .then(alert(`${row.libelle} supprimé !!!`));

            async function fetchMyAPI() {

                const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            // setPlateau(listPlateau.data);

            const listClimatiseur = await client.get(`${serverUrl}/climatiseur/ListClimatiseur`);
            //setClimatiseur(listClimatiseur.data);

            const getPLById = id => {
                const result = listPlateau.data.filter(p => p._id === id);
                return result[0].libelle
            }


            const rows = [
            ];

            listClimatiseur.data.map((clim, i) => {
                rows[i] = clim;
                rows[i].id = i + 1;
                rows[i].libelle = clim.libelle;
                rows[i].plateau = getPLById(clim.plateau);
                rows[i].marque = clim.marque;
                rows[i].chevaux = clim.chevaux;
                rows[i].etat = clim.etat;
            });

            setRowsData(rows)

            const rowsPlateau = [

            ];

            listPlateau.data.map((plateau, i) => {
                rowsPlateau[i] = plateau;
                rowsPlateau[i].id = plateau._id;

            });

            setRowsPl(rowsPlateau)
            }

            fetchMyAPI()

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
            // setPlateau(listPlateau.data);

            const listClimatiseur = await client.get(`${serverUrl}/climatiseur/ListClimatiseur`);
            //setClimatiseur(listClimatiseur.data);

            const getPLById = id => {
                const result = listPlateau.data.filter(p => p._id === id);
                return result[0].libelle
            }


            const rows = [
            ];

            listClimatiseur.data.map((clim, i) => {
                rows[i] = clim;
                rows[i].id = i + 1;
                rows[i].libelle = clim.libelle;
                rows[i].plateau = getPLById(clim.plateau);
                rows[i].marque = clim.marque;
                rows[i].chevaux = clim.chevaux;
                rows[i].etat = clim.etat;
            });

            setRowsData(rows)

            const rowsPlateau = [

            ];

            listPlateau.data.map((plateau, i) => {
                rowsPlateau[i] = plateau;
                rowsPlateau[i].id = plateau._id;

            });

            setRowsPl(rowsPlateau)

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
        <>
            <div align="right"><Button sx={{ color: blue[900] }} onClick={handleOpen}>Ajouter</Button></div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 530 }}>
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
                                            defaultValue={modalData && modalData.idBase}
                                            label="plateau"
                                            onChange={formik.handleChange}
                                            name="plateau"
                                            required
                                        >
                                            {rowsPl.map(p => <MenuItem key={p.id} value={p.id}>{p.libelle}</MenuItem>)}
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
                                            Modifier
                                        </Button>
                                    </center>
                                </form>
                            </row>
                        </FormikProvider >
                    </p>
                </Box>
            </Modal>
            <div style={{ height: 400, width: 'auto' }}>
                <DataGrid
                    rows={rowsData}
                    columns={columns}
                    pageSize={5}
                    // rowsPerPageOptions={[5]}
                    //checkboxSelection
                    options={options}
                />
            </div>
        </>

    );
}