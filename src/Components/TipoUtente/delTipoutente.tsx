import { FC, useEffect, useState } from 'react';
import styles from './delTipoUtente.module.css';
import { Link, useNavigate } from 'react-router-dom';

import { TipoUtenteData } from '../../Models/tipoutentedata';

import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
import { LockOutlined } from '@mui/icons-material';
import axios from 'axios';


interface DelTipoUtenteProps {};

const DelTipoUtente: FC<DelTipoUtenteProps> = () => {
    const [TipoUtenteId, setTipoUtenteId] = useState(0);
    const [TipoUtenteName, setTipoUtenteName] = useState("");
    const [TipoUtenteDesc, setTipoUtenteDesc] = useState(""); 

    const [listTipoUtente, setListTipoUtente] = useState<any[]>([]);

    useEffect(() => {
        // Dal localstorage prendere l'informazione del tipoutente 
        const idTipoUtente = localStorage.getItem("tipoutenteid");
        setTipoUtenteId(Number(idTipoUtente));

        const datitipoutentejson = localStorage.getItem("datitipoutentejson");

        // N.B. Poichè nello localStorage ho salvato la stringa posso fare JSON.parse
        const listatipoutente = JSON.parse(String(datitipoutentejson));

        // Finding the item with id = 8
        /// In questo caso il triplo = non va bene
        const tipoutente = listatipoutente.find((item: { id: string | null; }) => item.id == idTipoUtente);

        setTipoUtenteName(tipoutente.tipo);
        setTipoUtenteDesc(tipoutente.descrizione);
    }, []);    

    // To navigate to another component
    const navigate = useNavigate();

    const goBack = () => {
        // To navigate to another component
        navigate("/Components/TipoUtente/ListTipoUtente");
    }

    const callDelTipoUtente = async (id: number) => {
        // https://localhost:7182/api/TipoUtenteAsync
        const urlRootAPI = "https://localhost:44372/";
        const API_URL = urlRootAPI + "api/TipoUtenteAsync/" + id;
        console.log("callDelTipoUtente - URL Endpoint = " +  API_URL);

        // debugger;
        await axios.delete(API_URL, {
            headers: {
            "Content-Type": "application/json"
            }
        })
        .then((response) => {
            console.log(response.data);
            console.log(response.status);
            if(response.status == 200){
                navigate("/Components/TipoUtente/ListTipoUtente");
            }
        })
        .catch((error) => {
            console.log(error);
        });

    };

    return (
        <>

        <Container maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                mt: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                <LockOutlined />
                </Avatar>
                <Typography variant="h6">Are you sure to want delete the TipoUtente with ID={TipoUtenteId}?</Typography>
                <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        disabled
                        name="name"
                        fullWidth
                        id="name"
                        label="Tipologia"
                        autoFocus
                        value={TipoUtenteName}
                        onChange={(e) => setTipoUtenteName(e.target.value)}
                    />
                    </Grid>

                    <Grid item xs={12}>
                    <TextField
                        disabled
                        fullWidth
                        id="descrizione"
                        label="Descrizione"
                        name="descrizione"
                        value={TipoUtenteDesc}
                        onChange={(e) => setTipoUtenteDesc(e.target.value)}
                    />
                    </Grid>
                
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => callDelTipoUtente(TipoUtenteId)}
                    >
                        Delete
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={goBack}
                    >
                        Cancel and go back
                    </Button>
                </Grid>
                
                <Grid container justifyContent="flex-end">
                    <Grid item>
                    <Link to="/">Back to Home</Link>
                    </Grid>
                </Grid>
                
                </Box>
            </Box>
        </Container>

        </>
    );
}

export default DelTipoUtente;