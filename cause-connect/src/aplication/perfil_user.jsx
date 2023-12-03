import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './perfil_user.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../auth/AuthContext";
import bear from '../assets/Avatars/bear.png';
import boy from '../assets/Avatars/boy.png';
import chicken from '../assets/Avatars/chicken.png';
import dog from '../assets/Avatars/dog.png';
import human from '../assets/Avatars/human.png';
import man from '../assets/Avatars/man.png';
import rabbit from '../assets/Avatars/rabbit.png';
import woman from '../assets/Avatars/woman.png';
import LogoutButton from '../profile/Logout';
import { Carousel } from 'react-responsive-carousel';
import logo1 from '../assets/fundacion 1.png';

const PerfilUser = () => {
  const navigate = useNavigate();
  const {
    userName,
    token,
    userId,
    getName,
    setUserName,
    userFoto,
    nombreUsuario,
    userType,
    descripcionFundacion,
    contactoFundacion,
    sitiowebFundacion,
    setDescripcionFundacion,
    setContactoFundacion,
    setSitiowebFundacion,
    getDatosFundacion,
    setUserFoto,
    logout,
    proyect_userId
  } = useContext(AuthContext);

  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(userName);
  const [editedFoto, setEditedFoto] = useState(userFoto);
  const [editedDescripcion, setEditedDescripcion] = useState(descripcionFundacion);
  const [editedContacto, setEditedContacto] = useState(contactoFundacion);
  const [editedSitioweb, setEditedSitioweb] = useState(sitiowebFundacion);
  const [msg, setMensaje] = useState('');
  const [solidarityProjects, setSolidarityProjects] = useState([]);

  const imageOptions = [
    bear,
    chicken,
    dog,
    rabbit,
    boy,
    human,
    man,
    woman,
  ];

  useEffect(() => {
    const fetchSolidarityProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/proyectosolidario/id_user/${userId}`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setSolidarityProjects(response.data);
      } catch (error) {
        console.error('Error fetching solidarity projects:', error.message);
        console.log('Full response:', error.response);
      } finally {
      }
    };
    fetchSolidarityProjects();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    if (userName !== editedName || userFoto !== editedFoto) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
          {
            nombre: editedName,
            foto: editedFoto,
          }
        );
  
        if (response.status === 200) {
          setMensaje("Perfil actualizado correctamente.");
          getName(editedName);
          console.log('userName after updating:', userName);
          console.log(response.data);
        }
      } catch (error) {
        // Manejar errores de la petición
        console.error("Error en la petición de actualizar perfil:", error);
        setMensaje("Error en la petición de actualizar perfil.");
      }
    }
    if (descripcionFundacion !== editedDescripcion || contactoFundacion !== editedContacto || sitiowebFundacion !== editedSitioweb) {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/fundacion/update_por_userID/${userId}`,
            {
              descripcion: editedDescripcion,
              contacto: editedContacto,
              sitio_web: editedSitioweb
            }
          );
    
          if (response.status === 200) {
            setMensaje("Perfil actualizado correctamente.");
            getDatosFundacion(response.data);
            console.log('userName after updating:', userName);
            console.log(response.data);
          }
        } catch (error) {
          // Manejar errores de la petición
          console.error("Error en la petición de actualizar perfil:", error);
          setMensaje("Error en la petición de actualizar perfil.");
        }
      }
    setEditing(false);
  };
  
  
  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar tu usuario?");
  
    if (confirmDelete) {
      try {
        if (userType === 'fundación') {
          const responseUser = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`);
  
          if (responseUser.status === 204) {
            setMensaje("Usuario eliminado correctamente.");
            const responseFundacion = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/fundacion/borrar/${userId}`);
            if (responseFundacion.status === 204) {
                console.log('Fundacion eliminada');
                logout();
                navigate('./pagina_principal');
            }
          }
        } else {
          const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`);
  
          if (response.status === 204) {
            setMensaje("Usuario eliminado correctamente.");
            logout();
            navigate('./pagina_principal');
          }
        }
      } catch (error) {
        console.error("Error en la petición de eliminar usuario:", error);
        setMensaje("Error en la petición de eliminar usuario.");
      }
    }
    navigate('/pagina_principal');
    logout();
  };
  
  

  const handleImageClick = (imageUrl) => {
    setUserFoto(imageUrl);
  };

  return (
    <>
    <div className="perfil-usuario">
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

      <h2>Perfil de Usuario</h2>
      <h3>{userType}</h3>
      <div className="perfil-content">
        <div className="perfil-img">
          <img src={userFoto} alt="Foto de Perfil" style={{ width: '300px', height: '300px' }} />
          {editing && (
            <div className="image-options">
              <label htmlFor="foto">Foto de Perfil:</label>
              {imageOptions.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Opción ${index + 1}`}
                  onClick={() => handleImageClick(imageUrl)}
                  className={userFoto === imageUrl ? 'selected' : ''}
                  value={editedFoto}
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                  required
                />
              ))}
            </div>
          )}
        </div>
        <div className="perfil-atributos">
          <p>Nombre de Usuario: {nombreUsuario}</p>
          <p>
            Nombre:{' '}
            {editing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            ) : (
              userName
            )}
          </p>
          {!editing && userType === 'fundación' && (
            <>
                <p>Descripción: {descripcionFundacion}</p>
                <p>Contacto: {contactoFundacion}</p>
                <p>Sitio Web: {sitiowebFundacion}</p>
            </>
          )}
          {editing && (
            <div>
              {userType === 'fundación' ? (
                <>
                  <label>Descripción:</label>
                  <textarea
                    value={editedDescripcion}
                    onChange={(e) => setEditedDescripcion(e.target.value)}
                  />
                  <label>Contacto:</label>
                  <input
                    type="text"
                    value={editedContacto}
                    onChange={(e) => setEditedContacto(e.target.value)}
                  />
                  <label>Sitio Web:</label>
                  <input
                    type="text"
                    value={editedSitioweb}
                    onChange={(e) => setEditedSitioweb(e.target.value)}
                  />
                </>
              ) : null}
              <button className="guardar-btn" onClick={handleSave}>
                Guardar
              </button>
            </div>
          )}
        {!editing && (
        <>
            <button className="editar-btn" onClick={handleEdit}>
            Editar
            </button>
            <button className="eliminar-btn" onClick={handleDelete}>
            Eliminar Usuario
            </button>
        </>
        )}
        
        </div>
      </div>
    </div>
    <div>
    <section className="featured-organizations">
        <h2>Proyectos Solidarios</h2>
        
        {solidarityProjects.map((project) => {
          return (
          <div className="organization-card" key={project.id}>
            <Carousel showArrows={true} infiniteLoop={true}>
              <div>
                {/* Imagen fija para todos los proyectos */}
                <img src={logo1} alt="Heart Care" />
              </div>
            </Carousel>
            <h2>{project.titulo}</h2>
            <p>{project.descripcion}</p>
            <div className="button-group">
              {userId && userId.toString() === project.proyect_userId.toString() && (
                <button className="delete-button" onClick={() => handleDeleteButtonClick(project.id)}>
                  Eliminar
                </button>
              )}
            </div>
          </div>
          );
        })}
      </section>
    </div>
    </>
  );
};  
export default PerfilUser;
