import React, { useState, useContext, useEffect } from 'react';
import './PaginaPrincipal.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios'; // Agrega esta línea para importar Axios
import logo1 from '../assets/fundacion 1.png';
import logo2 from '../assets/fundacion 2.png';
import logo3 from '../assets/fundacion 3.png';
import logo from '../assets/logo.png';
import additional_11 from '../assets/adicional_11.jpg';
import additional_21 from '../assets/adicional_21.jpg';
import additional_22 from '../assets/adicional_22.jpg';
import additional_31 from '../assets/adicional_31.jpg';
import additional_32 from '../assets/adicional_32.jpg';
import LogoutButton from '../profile/Logout';
import { Link } from 'react-router-dom';

import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from 'react-router-dom';



export default function PaginaPrincipal() {
  const {
    userId,
    userName,
    userFoto,
    userType,
    proyect_userId,
    setToken,
    login,
    getType,
    token,
  } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tipoVoluntariado, setTiposVoluntariado] = useState('');
  const [x, setX] = useState(false);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const goToUserProfile = (res) => {
    navigate(`/vista_usuario/${res}`);
  };

  const goToProyectProfile = (res) => {
    navigate(`/perfil_proyecto/${res}`);
  };
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const [userNames, setUserNames] = useState([]);
  const [solidarityProjects, setSolidarityProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const tiposVoluntariado = [
    "Asistencia Alimentaria",
    "Atención Médica",
    "Educación",
    "Desarrollo Comunitario",
    "Protección del Medio Ambiente",
    "Asistencia en Desastres",
    "Derechos Humanos",
    "Apoyo Psicosocial",
    "Rescate Animal y Promoción de Adopción",
    "Asistencia a Adultos Mayores",
    "Construcción de Viviendas Sociales",
    "Desarrollo Recreativo Infantil"
  ];


  useEffect(() => {
    const fetchSolidarityProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/proyectosolidario`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setSolidarityProjects(response.data);
      } catch (error) {
        console.error('Error fetching solidarity projects:', error.message);
        console.log('Full response:', error.response);
      } finally {
        setLoading(false);
      }
    };

    fetchSolidarityProjects();
  }, []);

  useEffect(() => {
    // Define la función para realizar la búsqueda
    const performSearch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/obtener_por_nombre/${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSearchResults(response);
        console.log(response.data.id)
        if (typeof response.data.id === 'number') {
          goToUserProfile(response.data.id)
        }

      } catch (error) {
        console.error(error);
      }
    };

    // Llama a la función de búsqueda cuando el término de búsqueda cambia
    if (searchTerm) {
      performSearch();
    } else {
      // Limpia los resultados si el término de búsqueda está vacío
      setSearchResults([]);
    }
  }, [searchTerm, token]);

  const handleFilterButtonClick = async () =>

      setBusquedaRealizada(true);





  const getUserNameById = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/id/${userId}`);
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.data.nombre;
    } catch (error) {
      console.error('Error fetching username by ID:', error.message);
      console.log('Full response:', error.response);
      return null;
    }
  };


  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const names = await Promise.all(
          solidarityProjects.map(async (project) => {
            const userName = await getUserNameById(project.proyect_userId);
            return { projectId: project.id, userName };
          })
        );

        // Convert the array of user names to an object
        const userNamesObject = names.reduce((acc, { projectId, userName }) => {
          acc[projectId] = userName;
          return acc;
        }, {});

        setUserNames(userNamesObject);
      } catch (error) {
        console.error('Error fetching user names:', error);
      }
    };
    fetchUserNames();
  }, [solidarityProjects]);


  const handleDeleteButtonClick = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/proyectosolidario/${id}`);
      // Assuming a successful deletion, you may want to update the UI accordingly
      console.log('Project deleted successfully:', userId);

      // Update the state to reflect the deletion
      setSolidarityProjects((prevProjects) => prevProjects.filter((project) => proyect_userId !== userId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const boton = (e) => {
    setBusquedaRealizada(false);

  }

  // Función para el chat
  const handleChatButtonClick = (organizationName) => {
    const chatWindow = window.open('', '_blank', 'width=400,height=400');
    if (chatWindow) {
      chatWindow.document.write('<html><head></head><body>');
      chatWindow.document.write(`<h1 style="color: #ff5733;">Chat con ${organizationName}</h1>`);
      chatWindow.document.write('<div style="background-color: #f0f0f0; padding: 10px;">');
      chatWindow.document.write('<div style="max-height: 250px; overflow-y: scroll; border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;"></div>');
      chatWindow.document.write('<textarea id="chatTextArea" style="width: 100%; margin-bottom: 10px;"></textarea>');
      chatWindow.document.write('<button id="sendMessageButton" style="background-color: #ff5733; color: #fff; border: none; padding: 5px 10px; cursor: pointer;">Enviar</button>');
      chatWindow.document.write('</div>');
      chatWindow.document.write('</body></html>');

      chatWindow.onload = () => {
        // Una vez que la ventana emergente se ha cargado, agrega el evento al botón
        const sendMessageButton = chatWindow.document.getElementById('sendMessageButton');
        sendMessageButton.addEventListener('click', () => {
          const message = chatWindow.document.getElementById('chatTextArea').value;
          const chatMessages = chatWindow.document.querySelector('.max-height');
          chatMessages.innerHTML += `<p>Tú: ${message}</p>`;
          chatWindow.document.getElementById('chatTextArea').value = '';
        });
      };
    }
  };


  return (
    <div className="pagina-principal">
      <nav className="navbar">
        <a href="/pagina_principal">Inicio</a>
        <a href="/welcome">Bienvenida</a>
        <a href="/Instructions">Instrucciones</a>



        {/* Barra de búsqueda */}
        <input
          type="text"
          id="searchInput"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div>
          {x && response && response.data && response.data.id && (
            <div>
              <button onClick={() => goToUserProfile(response.data.id)}>
                View Profile
              </button>
            </div>
          )}
        </div>
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

      {/* Renderiza los resultados de la búsqueda */}
      {searchResults.length > 0 && (
        <div id="searchResults">
          <h2>Resultados de la búsqueda</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>{result.nombre}</li>
            ))}
          </ul>
        </div>
      )}
      <header className="header">
        <div className="header-content">
          <Link to="/welcome">
            <img src={logo} alt="Logo de Cause Connect" className="logo" />
          </Link>
          <h1>Cause Connect</h1>
          <p>Conectando fundaciones y voluntarios para cambiar vidas</p>
        </div>
      </header>
      <div className="search-bar">
        <div className="search-inputs">
          <h2>Filtra Proyectos Solidarios por Fecha o Tipo</h2>
          <div>
            <input
              type="date"
              placeholder="Fecha de inicio"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              placeholder="Fecha de fin"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="filtro-tipo-voluntariado">
              <label htmlFor="tipoVoluntariado">Tipo de Voluntariado:</label>
              <select
                id="tipoVoluntariado"
                value={tipoVoluntariado}
                onChange={(e) => setTiposVoluntariado(e.target.value)}
                onClick={boton}
              >
                <option value=""></option>
                {tiposVoluntariado.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}

              </select>
              <button className="search-button" onClick={handleFilterButtonClick}>
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="featured-organizations">
  <h2>Proyectos Solidarios</h2>

  {solidarityProjects.map((project) => {
    const userName = userNames[project.id];

    if ((busquedaRealizada && (tipoVoluntariado === "Todos" || project.categoria === tipoVoluntariado)) || !busquedaRealizada) {
      return (
        <div className="organization-card" key={project.id}>
          <Carousel showArrows={true} infiniteLoop={true}>
            <div>
              {/* Imagen fija para todos los proyectos */}
              <img src={logo1} alt="Heart Care" />
            </div>
          </Carousel>
          <h2>{project.titulo}</h2>
          <h3>Fundación que imparte el proyecto: {userName}</h3>
          <p>{project.descripcion}</p>
          <div className="button-group">
            <button className="follow-button" onClick={() => goToProyectProfile(project.id)}>Ver</button>
            <button className="contact-button" onClick={() => handleChatButtonClick(project.titulo)}>
              Contactar
            </button>
            {userId && userId.toString() === project.proyect_userId.toString() && (
              <button className="delete-button" onClick={() => handleDeleteButtonClick(project.id)}>
                Eliminar
              </button>
            )}
          </div>
        </div>
      );
    }

    return null; // Oculta el proyecto si no cumple con el filtro
  })}
</section>




      <section className="about-us" style={{ clear: 'both' }}>
        <h2>Acerca de Nosotros</h2>
        <p>
          Somos una plataforma que cree en el poder de la colaboración y el
          voluntariado. Nuestro objetivo es construir un mundo mejor
          conectando a personas y organizaciones con causas benéficas. Juntos,
          podemos marcar la diferencia.
        </p>
      </section>

      <footer className="footer">
        <p>&copy; Cause Connect</p>
      </footer>
    </div>
  );

}
