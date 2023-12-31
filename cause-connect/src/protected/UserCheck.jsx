import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";

function UserCheck() {
  const { token } = useContext(AuthContext);
  const [msg, setMsg] = useState(""); 

  const config = {
    method: 'get',
    url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    axios(config)
      .then((response) => {
        console.log('Enviaste un token bueno y estás logueado!');
        console.log(response);
        setMsg(response.data.message);
      })
      .catch((error) => {
        console.log('Hubo un error, no estás logueado o el token expiró.');
        console.log(error);
        setMsg(error.message);
      });
  }, [token]); // Dependencia token para ejecutar el efecto cuando el token cambia

  return (
    <h1>{msg}</h1>
  );
}

export default UserCheck;