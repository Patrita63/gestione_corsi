import { FC, useEffect, useState } from 'react';
import styles from './editTipoUtente.module.css';
import { useNavigate } from 'react-router-dom';

interface EditTipoUtenteProps {};

const EditTipoUtente: FC<EditTipoUtenteProps> = () => {
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
        EditTipoUtente with ID={TipoUtenteId}

        <input type="submit"  className={styles.MarginLeftAuto} onClick={gotoHome} value='goto Home'></input>

        </>
    );
}

export default EditTipoUtente;