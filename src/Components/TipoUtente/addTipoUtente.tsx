import { FC, useEffect, useState } from 'react';
import styles from './addTipoUtente.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

interface AddTipoUtenteProps {};

const AddTipoUtente: FC<AddTipoUtenteProps> = () => {

    const [TipoUtenteId, setTipoUtenteId] = useState(0);
    const [TipoUtenteName, setTipoUtenteName] = useState("");
    const [TipoUtenteDesc, setTipoUtenteDesc] = useState(""); 

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

    const callCreateTipoUtente = async (id: number) => {
        // https://localhost:7182/api/TipoUtenteAsync
        const urlRootAPI = "https://localhost:44372/";
        const API_URL = urlRootAPI + "api/TipoUtenteAsync";
        console.log("callDelTipoUtente - URL Endpoint = " +  API_URL);

        // debugger;

        /* {
            "id": 7,
            "tipo": "string123",
            "descrizione": "desc string123",
            "utenti": null
          } */
        await axios.post(API_URL, {
            id: TipoUtenteId,
            tipo: TipoUtenteName,
            descrizione: TipoUtenteDesc,
            utenti: null,
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
                <Typography variant="h6">Add new TipoUtente</Typography>
                <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        required
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
                        required
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
                        onClick={() => callCreateTipoUtente(TipoUtenteId)}
                    >
                        Add
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

export default AddTipoUtente;
