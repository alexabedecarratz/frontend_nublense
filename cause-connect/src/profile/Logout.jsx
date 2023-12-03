import React, { useContext, useState} from 'react';
import '../aplication/Inicio_sesion.jsx';
import { AuthContext } from '../auth/AuthContext';

const LogoutButton = () => {
    const { userId, logout } = useContext(AuthContext); 
    const [msg, setMsg] = useState("");

    const handleLogout = () => {
        console.log(userId)
        logout();
        setMsg("Has cerrado sesión con éxito!");
    }

    if (userId !== 'null') {
        return (
            <>
                {msg.length > 0 && <div className="successMsg"> {msg} </div>}
                <button onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </>
        );
    } else {
        return null; // No muestra nada si userId es null
    }
}

export default LogoutButton;
