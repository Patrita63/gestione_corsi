import { FC, useEffect, useState } from 'react';
import styles from './viewTipoUtente.module.css';
import { useNavigate } from 'react-router-dom';

interface ViewTipoUtenteProps {};

const ViewTipoUtente: FC<ViewTipoUtenteProps> = () => {
    const [TipoUtenteId, setTipoUtenteId] = useState(0);
    useEffect(() => {
        // Dal localstorage prendere l'informazione del tipoutente 
        const idTipoUtente = localStorage.getItem("tipoutenteid");
        setTipoUtenteId(Number(idTipoUtente));
    }, []);    

    // To navigate to another component
    const navigate = useNavigate();

    const gotoHome = () => {
        // To navigate to another component
        navigate("/");
    }
    
    return (
        <>
        ViewTipoUtente with ID={TipoUtenteId}

        <input type="submit"  className={styles.MarginLeftAuto} onClick={gotoHome} value='goto Home'></input>

        </>
    );
}

export default ViewTipoUtente;