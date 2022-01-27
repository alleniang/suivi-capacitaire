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
import { AjoutCapacitairePlateau } from './AjoutCapacitairePlateau';
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

export default function TestTab() {

    // const [capacitairePlateau, setCapacitairePlateau] = useState([])
    // const [plateau, setPlateau] = useState([])
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

            const listCapacitairePlateau = await client.get(`${serverUrl}/capacitairePlateau/ListCapacitairePlateau`);
            // setCapacitairePlateau(listCapacitairePlateau.data);

            const getPLById = id => {
                const result = listPlateau.data.filter(p => p._id === id);
                return result[0].libelle
            }


            const rows = [
            ];

            listCapacitairePlateau.data.map((plateau, i) => {
                rows[i] = plateau;
                rows[i].id = i + 1;
                rows[i].date = plateau.date;
                rows[i].plateau = getPLById(plateau.plateau);
                rows[i].site = plateau.site;
                rows[i].capacite = plateau.capacite;
                rows[i].positions = plateau.positions;
                rows[i].positionsOK = plateau.positionsOK;
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
        { field: 'date', headerName: 'Date' },
        { field: 'plateau', headerName: 'Plateau' },
        { field: 'site', headerName: 'Site' },
        { field: 'capacite', headerName: 'Capacité', type: 'number' },
        { field: 'boxes', headerName: 'Boxes', type: 'number' },
        { field: 'positions', headerName: 'Positions', type: 'number' },
        { field: 'positionsOK', headerName: 'Positions OK', type: 'number' },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params) => (
                <>
                    <IconButton aria-label="Edit" >
                        <EditIcon sx={{ color: blue[500] }} onClick={() => { handleOpenM(params.row) }} />
                    </IconButton>
                    <IconButton aria-label="delete" >
                        <DeleteIcon sx={{ color: red[400] }} onClick={() => deleteCapacitairePlateau(params.row)} />
                    </IconButton>
                </>
            ),
        },
    ];

    useEffect(() => {
        async function fetchMyAPI() {

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            // setPlateau(listPlateau.data);

            const listCapacitairePlateau = await client.get(`${serverUrl}/capacitairePlateau/ListCapacitairePlateau`);
            // setCapacitairePlateau(listCapacitairePlateau.data);

            const getPLById = id => {
                const result = listPlateau.data.filter(p => p._id === id);
                return result[0].libelle
            }


            const rows = [
            ];

            listCapacitairePlateau.data.map((plateau, i) => {
                rows[i] = plateau;
                rows[i].id = i + 1;
                rows[i].date = plateau.date;
                rows[i].idBase = plateau.plateau;
                rows[i].plateau = getPLById(plateau.plateau);
                rows[i].site = plateau.site;
                rows[i].capacite = plateau.capacite;
                rows[i].positions = plateau.positions;
                rows[i].positionsOK = plateau.positionsOK;
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

            const listCapacitairePlateau = await client.get(`${serverUrl}/capacitairePlateau/ListCapacitairePlateau`);
            // setCapacitairePlateau(listCapacitairePlateau.data);

            const getPLById = id => {
                const result = listPlateau.data.filter(p => p._id === id);
                return result[0].libelle
            }


            const rows = [
            ];

            listCapacitairePlateau.data.map((plateau, i) => {
                rows[i] = plateau;
                rows[i].id = i + 1;
                rows[i].date = plateau.date;
                rows[i].plateau = getPLById(plateau.plateau);
                rows[i].site = plateau.site;
                rows[i].capacite = plateau.capacite;
                rows[i].positions = plateau.positions;
                rows[i].positionsOK = plateau.positionsOK;
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

    const deleteCapacitairePlateau = (row) => {

        if (window.confirm("Voulez vous vraiment supprimer ?")) {
            axios.delete(`${serverUrl}/capacitairePlateau/delete-CapacitairePlateau/${row._id}`)
                .then(alert(`${row.libelle} supprimé !!!`));

            async function fetchMyAPI() {

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            // setPlateau(listPlateau.data);

            const listCapacitairePlateau = await client.get(`${serverUrl}/capacitairePlateau/ListCapacitairePlateau`);
            // setCapacitairePlateau(listCapacitairePlateau.data);

            const getPLById = id => {
                const result = listPlateau.data.filter(p => p._id === id);
                return result[0].libelle
            }


            const rows = [
            ];

            listCapacitairePlateau.data.map((plateau, i) => {
                rows[i] = plateau;
                rows[i].id = i + 1;
                rows[i].date = plateau.date;
                rows[i].plateau = getPLById(plateau.plateau);
                rows[i].site = plateau.site;
                rows[i].capacite = plateau.capacite;
                rows[i].positions = plateau.positions;
                rows[i].positionsOK = plateau.positionsOK;
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
        date: modalData && modalData.date,
        plateau: modalData && modalData.plateau,
        operation: modalData && modalData.operation,
        site: modalData && modalData.site,
        capacite: modalData && modalData.capacite,
        boxes: modalData && modalData.boxes,
        positions: modalData && modalData.positions,
        positionsOK: modalData && modalData.positionsOK,
    },

    onSubmit: values => {
        var mois = value.getMonth()
        mois += 1
        values.date = value.getDate() + "-" + mois + "-" + value.getFullYear();
        axios.put(`${serverUrl}/capacitairePlateau/update-capacitairePlateau/${modalData._id}`, values)
            .then(res => {
                alert('Modification réussie !');
            });

        async function fetchMyAPI() {

            const listPlateau = await client.get(`${serverUrl}/plateau/ListPlateau`);
            // setPlateau(listPlateau.data);

            const listCapacitairePlateau = await client.get(`${serverUrl}/capacitairePlateau/ListCapacitairePlateau`);
            // setCapacitairePlateau(listCapacitairePlateau.data);

            const getPLById = id => {
                const result = listPlateau.data.filter(p => p._id === id);
                return result[0].libelle
            }


            const rows = [
            ];

            listCapacitairePlateau.data.map((plateau, i) => {
                rows[i] = plateau;
                rows[i].id = i + 1;
                rows[i].date = plateau.date;
                rows[i].plateau = getPLById(plateau.plateau);
                rows[i].site = plateau.site;
                rows[i].capacite = plateau.capacite;
                rows[i].positions = plateau.positions;
                rows[i].positionsOK = plateau.positionsOK;
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
                <h2 id="parent-modal-title" align="center">Ajouter Capacitaire Plateau</h2>
                <p id="parent-modal-description">
                    <AjoutCapacitairePlateau />
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
                <h2 id="parent-modal-title" align="center">Modifier Capacitaire Plateau</h2>
                <p id="parent-modal-description">
                    <FormikProvider value={formik}>
                        <row>
                            <form onSubmit={formik.handleSubmit}>
                                {modalData && modalData.date}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <FormControl sx={{ minWidth: 222 }}>
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
                                <FormControl sx={{ m: 0, minWidth: 222 }}>
                                    <InputLabel id="site">Site*</InputLabel>
                                    <Select
                                        labelId="site"
                                        id="site"
                                        size="small"
                                        variant="outlined"
                                        value={formik.values.site}
                                        defaultValue={modalData && modalData.site}
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
                                    value={formik.values.capacite}
                                    defaultValue={modalData && modalData.capacite}
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
                                    value={formik.values.boxes}
                                    defaultValue={modalData && modalData.boxes}
                                    size="small"
                                    onChange={formik.handleChange}
                                    required
                                />
                                &nbsp;&nbsp;
                                <TextField
                                    id="positions"
                                    label="Positions"
                                    variant="outlined"
                                    value={formik.values.positions}
                                    defaultValue={modalData && modalData.positions}
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
                                        value={formik.values.positionsOK}
                                        defaultValue={modalData && modalData.positionsOK}
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