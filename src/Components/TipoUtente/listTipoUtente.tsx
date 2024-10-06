import { FC, useEffect, useState } from 'react';
import styles from './listTipoUtente.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TipoUtenteData } from '../../Models/tipoutentedata';
import { LockOutlined, Padding } from '@mui/icons-material';
import { Avatar, Box, Button, Container, CssBaseline, Typography } from '@mui/material';

interface ListTipoUtenteProps {}

const ListTipoUtente: FC<ListTipoUtenteProps> = () => {

    const [listTipoUtente, setListTipoUtente] = useState<any[]>([]);
    const [hasTipoUtente, setHasTipoUtente] = useState(false);
    // To navigate to another component
    const navigate = useNavigate();

    const gotoHome = () => {
        // To navigate to another component
        navigate("/");
    }

    const gotoEdit = (id: number) => {
        localStorage.setItem("tipoutenteid", String(id));
        navigate("/Components/TipoUtente/EditTipoUtente");
    }

    const gotoView = (id: number) => {
        localStorage.setItem("tipoutenteid", String(id));
        navigate("/Components/TipoUtente/ViewTipoUtente");
    }

    const gotoDelete = (id: number) => {
        localStorage.setItem("tipoutenteid", String(id));
        navigate("/Components/TipoUtente/DeleteTipoUtente");
    }

    useEffect(() => {
        // call api or anything
        console.log("loaded");
        callGetTipiUtenteAsync();
     },[]);

    const callGetTipiUtenteAsync = async () => {
        // https://localhost:7182/api/TipoUtenteAsync
        const urlRootAPI = "https://localhost:44372/";
        const API_URL = urlRootAPI + "api/TipoUtenteAsync";
        console.log("callGetTipiUtenteAsync - URL Endpoint = " +  API_URL);

        // debugger;
        await axios.get(API_URL, {
            headers: {
            "Content-Type": "application/json"
            }
        })
        .then((response) => {
            // debugger;
            if(response.data){
                console.log(response.data);
                console.log(response.status);
                // console.log('id: ' + response.data[0].id);
                // console.log('Tipo: ' + response.data[0].tipo);
                // console.log('Descrizione: ' + response.data[0].descrizione);
                setListTipoUtente(response.data);
                setHasTipoUtente(true);

                // N.B. Nello localStorage salvo la stringa
                localStorage.setItem("datitipoutentejson", JSON.stringify(response.data));
            }
        })
        .catch((error) => {
            setHasTipoUtente(false);
            // localStorage.clear();
            console.log(error);
        });

    };

    return (
        <>
        <Container maxWidth="lg">
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
                <Typography variant="h6">List of TipoUtente</Typography>
                {hasTipoUtente && (       
                    <div>
                        <Link to="/Components/TipoUtente/AddTipoUtente">Add a new TipoUtente</Link>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>TipoUtente Id</th>
                                    <th>Tipologia</th>
                                    <th>Descrizione</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listTipoUtente.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.tipo}</td>
                                    <td>{item.descrizione}</td>
                                    <td>
                                        <input type="submit" onClick={() => gotoEdit(item.id)} value='Edit'></input>
                                        <input type="submit" onClick={() => gotoView(item.id)} value='View'></input>
                                        <input type="submit" onClick={() => gotoDelete(item.id)} value='Delete'></input>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                )}

                {/* <input type="submit"  className={styles.MarginLeftAuto} onClick={gotoHome} value='goto Home'></input> */}

                <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={gotoHome}
                    >

                    goto Home
                </Button>
            </Box>
        </Container>
        </>
    )
}

export default ListTipoUtente;