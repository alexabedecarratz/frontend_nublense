import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from "../auth/AuthContext";
import { useParams } from 'react-router'; 
import './proyecto_solidario.css';
import { Link } from 'react-router-dom';
import LogoutButton from '../profile/Logout';

const PerfilProyecto = ({ match }) => {
  const [proyecto, setProyecto] = useState(null);
  const [fundacion, setFundacion] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [usuarioNombre, setUsuarioNombre] = useState(null);
  const [usuarioFoto, setUsuarioFoto] = useState(null);
  const [usuarioID, setUsuarioID] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [msg, setMsg] = useState('');
  const { id } = useParams();
  const {
    userId,
    userName,
    userFoto,
    userType,
    proyect_userId,
    setToken,
    setUserId,
    login,
    getType,
    token,
    userMail
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        console.log(`id: ${id}`)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/proyectosolidario/${id}`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setProyecto(response.data);
        console.log(`hola: ${response.data}`);
        setUsuarioID(response.data.proyect_userId);
        
        // Lógica de fetchFundacion
        try {
          const idUsuario = parseInt(response.data.proyect_userId, 10);
          console.log(`fundacion id: ${response.data.proyect_userId}`)
          const responseFundacion = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fundacion/get_por_userID/${idUsuario}`);
          if (responseFundacion.status !== 200) {
            throw new Error(`HTTP error! Status: ${responseFundacion.status}`);
          }
          setFundacion(responseFundacion.data);
        } catch (error) {
          console.error('Error fetching fundacion:', error);
        }
  
        // Lógica de fetchUsuario
        try {
          const idUsuario = parseInt(response.data.proyect_userId, 10);
          console.log(`usuarioooo id: ${response.data.proyect_userId}`)
          const responseUsuario = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/id/${idUsuario}`);
          if (responseUsuario.status !== 200) {
            throw new Error(`HTTP error! Status: ${responseUsuario.status}`);
          }
          setUsuario(responseUsuario.data);
        } catch (error) {
          console.error('Error fetching usuario:', error);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
  
    fetchProyecto();
  }, [id]);
  
  const handleInscribirse = async (event) => {
    event.preventDefault();
    console.log(proyecto?.id)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/inscripcion`, {
        id_usuario: userId,
        id_proyecto: proyecto?.id,
        mensaje: mensaje
      });
  
      if (response.status === 201) {
        setMsg('Inscripción registrada con éxito\n¡Te contactaremos a tu mail si quedas seleccionado!');
      } else {
        setMsg('Error al registrar la inscripción');
      }
    } catch (error) {
      console.error('Error al registrar la inscripción:', error);
      setMsg('Error al registrar la inscripción');
    }
  };

  const handleChange = (e) => {
    setMensaje(e.target.value);
  };

  if (!proyecto) {
    // Puedes mostrar un mensaje de carga o manejar la falta de datos de alguna manera
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <nav className="navbar">
        <a href="/pagina_principal">Inicio</a>
        <a href="/welcome">Bienvenida</a>
        <a href="/Instructions">Instrucciones</a>
        {userId === 'null' ? (
          <>
            <a href='/registro'>Registro</a>
            <a href='/login'>Iniciar sesión</a>
          </>
        ) : (
          <>
            <span className="user-label">{userName}</span>
            {userType === 'fundación' && (
              <Link to="/subir_proyecto">
                <button className="add-project-button">Crear Proyecto</button>
              </Link>
            )}
            <LogoutButton></LogoutButton>
            <a href={`/perfil_user`}>
              <img src={userFoto} alt="foto-perfil" style={{ width: '45px', height: '45px' }} />
            </a>
          </>
        )}
      </nav>
      <div className="container-principal">
        <div className="perfil-proyecto-container">
          <h2>Proyecto: {proyecto.titulo}</h2>
          <div className="info-section">
              <p><strong>Descripción del proyecto</strong></p>
              <p>{proyecto.descripcion}</p>
              <p><strong>Objetivos del Proyecto</strong></p>
              <p>{proyecto.objetivos}</p>
              <p><strong>Fecha de Inicio</strong></p>
              <p>{proyecto.fecha_inicio}</p>
              <p><strong>Fecha de Término</strong></p>
              <p>{proyecto.fecha_finalizacion}</p>
              <p><strong>Categoría</strong></p>
              <p>{proyecto.categoria}</p>
          </div>
          </div>

      <div className="inscripcion-form">
        <h2>Formulario de Inscripción</h2>
        <div className="info-section">
          <h3>Nombre Voluntario:</h3>
          <p>{userName}</p>
          <h3>Mail:</h3>
          <p>{userMail}</p>
        </div>
        <label>
          Déjanos un mensaje de inscripción:
          <input type="text" value={mensaje} onChange={handleChange} style={{ width: '100%' }}/>
        </label>
        <button onClick={handleInscribirse}>Inscribirse</button>
        <p>{msg}</p>
        </div>
        </div>
        <div>
          <div className="perfil-container">
          <h2>Perfil de la Fundación que imparte el proyecto</h2>
          <div className="perfil-content">
            <div className="perfil-img">
              <img src={usuario?.foto} alt="Foto de Perfil" style={{ width: '200px', height: '200px' }} />
            </div>
            <div className="perfil-atributos">
              <h2>{usuario?.nombre}</h2>
              <h3>{fundacion?.descripcion}</h3>
              <p>Nombre de Usuario: {usuario?.nombre_usuario}</p>
              <p>Mail: {usuario?.mail}</p>
              <p>Contacto: {fundacion?.contacto}</p>
              <p>Sitio Web: {fundacion?.sitio_web}</p>
            </div>
          </div>
      </div>
    </div>
    </div>
  );
};

export default PerfilProyecto;
