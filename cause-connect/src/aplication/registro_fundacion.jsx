import React, { useState, useContext } from 'react';
import axios from 'axios';
import './registro_fundacion.css';
import { AuthContext } from "../auth/AuthContext";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from 'react-router-dom';

function RegistrationFormFundacion() {
  const { setToken, setUserId, login, userId, getType, getName, getFoto, getUserName, getDatosFundacion } = useContext(AuthContext);
  const navigate = useNavigate();
  const auth = useAuth();
  const [formData, setFormData] = useState({
    descripcion: '',
    contacto: '',
    sitio_web:'',
  });

  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const obtenerDatosFundacion = async (id) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/fundacion/datos_fundacion/${id}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    try {
      console.log('1')
      console.log(userId)
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/fundacion/crear_fundacion`, {
          user_id: userId,
          descripcion: formData.descripcion,
          contacto: formData.contacto,
          sitio_web: formData.sitio_web
      });
      
      if (response.status === 201) {
        setMsg('Fundación registrada con éxito');
        const datos_fundacion = await obtenerDatosFundacion(response.data.id);
        getDatosFundacion(datos_fundacion);
        navigate('/pagina_principal')

      const response_update = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`, 
        { fundacion: response.data.id },
      );
      console.log(response_update.status)

        
      } else {
        console.log(error)
        console.error('Error al registrar la fundación:', error);
        setMsg('Error al registrar la fundación');
      }
    } catch (error) {
      console.log('aqui2')
      console.error('Error al registrar la fundación:', error);
      setMsg('Error al registrar la fundación');
    }
  };

  return (
    <div className="pagina-registro">
      {/* Barra de navegación */}
      <nav className="navbar">
        <a href="/pagina_principal">Inicio</a>
        <a href="/welcome">Bienvenida</a>
        <a href="/Instructions">Instrucciones</a>
        <a href="/contacto">Contacto</a>
        <a href='/registro'> Registro </a>
        <a href='/login'> Iniciar sesion </a>
      </nav>
      {/* Aquí termina la barra de navegación */}

      <div className="registration-container">
        <h2>Formulario de Registro</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contacto">Contacto (celular):</label>
            <input
              type="contacto"
              id="contacto"
              name="contacto"
              value={formData.contacto}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sitio_web">Sitio Web:</label>
            <input
              type="text"
              id="sitio_web"
              name="sitio_web"
              value={formData.sitio_web}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Registrarse</button>
          {msg && <h2 className="errormsj">{msg}</h2>}
        </form>
      </div>
      <div>
      <section className="about-us" style={{ clear: 'both' }}>
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
  </div>
  );
}

export default RegistrationFormFundacion;