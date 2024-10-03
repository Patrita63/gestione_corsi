import { FC, useEffect, useState } from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface HomeProps {}

const Home: FC<HomeProps> = () => {

    const [listTipoUtente, setListTipoUtente] = useState<any[]>([]);
    const [hasTipoUtente, setHasTipoUtente] = useState(false);
    // To navigate to another component
    const navigate = useNavigate();

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
        {hasTipoUtente && (            
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>TipoUtente Id</th>
                            <th>Tipologia</th>
                            <th>Descrizione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listTipoUtente.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.tipo}</td>
                            <td>{item.descrizione}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        </>
    )
}

export default Home;