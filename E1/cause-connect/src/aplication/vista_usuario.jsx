import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './perfil_user.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../auth/AuthContext";
import LogoutButton from '../profile/Logout';
import { useParams } from 'react-router-dom';

const VistaPerfil = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { logout, token, userName, userFoto } = useContext(AuthContext);
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [datosFundacion, setDatosFundacion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsuario = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/id/${userId}`);
        setDatosUsuario(responseUsuario.data);

        if (responseUsuario.data.tipo === 'fundación') {
          const responseFundacion = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fundacion/get_por_userID/${userId}`);
          setDatosFundacion(responseFundacion.data);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="perfil-usuario">
      <nav className="navbar">
      <nav className="navbar">
        <a href="/pagina_principal">Inicio</a>
        <a href="/welcome">Bienvenida</a>
        <a href="/Instructions">Instrucciones</a>

        {userId === 'null' && <a href='/registro'> Registro</a>}
        {userId === 'null' && <a href='/login'> Iniciar sesión</a>}
        {userId !== 'null' && <span className="user-label">{userName}</span>}
        {userId !== 'null' && <img src={userFoto} alt="foto-perfil" style={{ width: '45px', height: '45px' }} />}
        {userId !== 'null' && <LogoutButton></LogoutButton>}
        </nav>
      </nav>

      <h2>Perfil de Usuario</h2>
      <div className="perfil-content">
        <div className="perfil-img">
          <img src={datosUsuario?.foto} alt="Foto de Perfil" style={{ width: '300px', height: '300px' }} />
        </div>
        <div className="perfil-atributos">
          <p>Nombre de Usuario: {datosUsuario?.nombre_usuario}</p>
          <p>Nombre: {datosUsuario?.nombre}</p>
          {datosUsuario?.tipo === 'fundación' && (
            <>
              <p>Descripción: {datosFundacion?.descripcion}</p>
              <p>Contacto: {datosFundacion?.contacto}</p>
              <p>Sitio Web: {datosFundacion?.sitio_web}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VistaPerfil;
