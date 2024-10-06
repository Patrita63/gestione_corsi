import { FC, useEffect, useState } from 'react';
import styles from './listTipoUtente.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TipoUtenteData } from '../../Models/tipoutentedata';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, CssBaseline, Typography } from '@mui/material';
// https://mui.com/x/react-data-grid/getting-started/#installation
import { DataGrid, GridApi, GridColDef, GridRowsProp, GridActionsCellItemProps } from '@mui/x-data-grid';

  
interface ListTipoUtenteProps {}

const ListTipoUtente: FC<ListTipoUtenteProps> = () => {

    const [listTipoUtente, setListTipoUtente] = useState<any[]>([]);
    const [hasTipoUtente, setHasTipoUtente] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const [rowsListTipoUtente, setListRowsTipoUtente] = useState<GridRowsProp>();
    const [columnsListTipoUtente, setListColumnsTipoUtente] = useState<GridColDef[]>([]);

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

    /* 
    N.B. GridCellValue ==> GridActionsCellItemProps
    Vedere anche 
    (c) => (thisRow[c.field] = params.row)
    https://codesandbox.io/p/sandbox/64331095-cant-add-a-button-to-every-row-in-material-ui-table-forked-hwighx?file=%2Fdemo.tsx%3A27%2C6
    https://mui.com/x/react-data-grid/server-side-data/ 
    */
   
    useEffect(() => {
        const source = axios.CancelToken.source(); // Crea un token di cancellazione

        const fetchData = async () => {
            try {
                setLoading(true);
                const urlRootAPI = "https://localhost:44372/";
                const API_URL = urlRootAPI + "api/TipoUtenteAsync";
                console.log("LOADED - fetchData - URL Endpoint = " +  API_URL);
                const response = await axios.get(API_URL, {
                    cancelToken: source.token, // Aggiungi il token di cancellazione
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                console.log(response.data);
                console.log(response.status);
                setListTipoUtente(response.data);
                setHasTipoUtente(true);

                // N.B. Nello localStorage salvo la stringa
                localStorage.setItem("datitipoutentejson", JSON.stringify(response.data));

                const rows: GridRowsProp = listTipoUtente;
                /* [
                    { id: 1, col1: "Hello", col2: "World" },
                    { id: 2, col1: "MUI X", col2: "is awesome" },
                    { id: 3, col1: "Material UI", col2: "is amazing" },
                    { id: 4, col1: "MUI", col2: "" },
                    { id: 5, col1: "Joy UI", col2: "is awesome" },
                    { id: 6, col1: "MUI Base", col2: "is amazing" }
                ]; */
                setListRowsTipoUtente(rows);

                // N.B. Mettere come field i dati ritornati dalla restAPI
                const columns: GridColDef[] = [
                    { field: "id", headerName: 'Id', width: 60, hideable: true },
                    { field: 'tipo', headerName: 'Tipo', width: 150 },
                    { field: 'descrizione', headerName: 'Descrizione', width: 250 },
                    {
                        field: "actionEdit",
                        headerName: "Edit",
                        sortable: false,
                        renderCell: (params) => {
                        const onClick = (e: { stopPropagation: () => void; }) => {
                            e.stopPropagation(); 
                    
                            const api: GridApi = params.api;
                            let thisRow: Record<string, GridActionsCellItemProps> = {};
                            api
                            .getAllColumns()
                            .filter((c) => c.field !== "__check__" && !!c)
                            thisRow["actionEdit"] = params.row
                            
                    
                            return gotoEdit(params.row.id); 
                        };
                    
                        return <Button onClick={onClick}>Edit</Button>;
                        }
                    },
                    {
                        field: "actionView",
                        headerName: "View",
                        sortable: false,
                        renderCell: (params) => {
                        const onClick = (e: { stopPropagation: () => void; }) => {
                            e.stopPropagation(); // don't select this row after clicking
                    
                            const api: GridApi = params.api;
                            // const thisRow: Record<string, GridActionsCellItemProps> = {};
                            let thisRow: Record<string, GridActionsCellItemProps> = {};
                            api
                            .getAllColumns()
                            .filter((c) => c.field !== "__check__" && !!c)
                            thisRow["actionView"] = params.row
                            /* .forEach(
                                (c) => (thisRow[c.field] = params.row)
                            ); */
                    
                            return gotoView(params.row.id); // alert(JSON.stringify(thisRow, null, 4));
                        };
                    
                        return <Button onClick={onClick}>View</Button>;
                        }
                    },
                    {
                        field: "actionDelete",
                        headerName: "Delete",
                        sortable: false,
                        renderCell: (params) => {
                        const onClick = (e: { stopPropagation: () => void; }) => {
                            e.stopPropagation(); // don't select this row after clicking
                    
                            const api: GridApi = params.api;
                            // const thisRow: Record<string, GridActionsCellItemProps> = {};
                            let thisRow: Record<string, GridActionsCellItemProps> = {};
                            api
                            .getAllColumns()
                            .filter((c) => c.field !== "__check__" && !!c)
                            thisRow["actionDelete"] = params.row
                            /* .forEach(
                                (c) => (thisRow[c.field] = params.row)
                            ); */
                    
                            return gotoDelete(params.row.id); // alert(JSON.stringify(thisRow, null, 4));
                        };
                    
                        return <Button onClick={onClick}>Delete</Button>;
                        }
                    }
                ];
                setListColumnsTipoUtente(columns);

            } catch (err) {
            if (axios.isCancel(err)) {
                console.log('Richiesta cancellata', err.message);
                setHasTipoUtente(false);
                setListRowsTipoUtente([]);
                setListColumnsTipoUtente([]);
                // localStorage.clear();
            } else {
                setError('Errore durante il recupero dei dati');
                setListRowsTipoUtente([]);
                setListColumnsTipoUtente([]);
            }
            } finally {
                setLoading(false);
            }
        };

        fetchData();   // Chiama la chiamata

        // Pulisci la chiamata axios se il componente viene smontato
        return () => {
            source.cancel('La chiamata è stata annullata poiché il componente è stato smontato.');
        };
    }, []);

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

        {loading && (       
            <div>
                
                <div style={{ height: 300, width: '100%' }}>
                    Caricamento ...
                </div>
            </div>
            
        )}

        {error && (       
            <div>
                
                <div style={{ height: 300, width: '100%' }}>
                    {error}
                </div>
            </div>
            
        )}

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

                        <div style={{ height: 300, width: '100%' }}>
                            <DataGrid rows={rowsListTipoUtente} columns={columnsListTipoUtente} />
                        </div>
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