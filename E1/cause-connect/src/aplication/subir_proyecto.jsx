import React, { useState, useContext } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './subir_proyecto.css';
import { AuthContext } from '../auth/AuthContext';


function ProyectFrom() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);


  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha_inicio: new Date(),
    fecha_termino: new Date(),
    objetivos: '',
    categoria: ''
  });

  const [msg, setMsg] = useState('');

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/proyectosolidario`, {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fecha_inicio: formData.fecha_inicio,
        fecha_finalizacion: formData.fecha_termino, // Cambiado a fecha_finalizacion
        objetivos: formData.objetivos,
        categoria: formData.categoria,
        proyect_userId: userId.toString(), // Add userId to the payload
      });

  
      if (response.status === 201) {
        setMsg('Proyecto registrado con éxito');
        navigate('/pagina_principal');
      } else {
        setMsg('Error al registrar el proyecto');
      }
    } catch (error) {
      console.error('Error al registrar el proyecto:', error);
      setMsg('Error al registrar el proyecto');
    }
  };

  return (
    <div className="pagina-post-proyecto">
      {/* Barra de navegación */}
      <nav className="navbar">
        <a href="/pagina_principal">Inicio</a>
        <a href="/welcome">Bienvenida</a>
        <a href="/Instructions">Instrucciones</a>
        <a href="/contacto">Contacto</a>
      </nav>
      {/* Aquí termina la barra de navegación */}

      <div className="registration-container">
        <h2>Sube un nuevo proyecto solidario</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={(e) => handleChange('titulo', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={(e) => handleChange('descripcion', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fecha_inicio">Fecha Inicio:</label>
            <DatePicker
              selected={formData.fecha_inicio}
              onChange={(date) => handleChange('fecha_inicio', date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fecha_termino">Fecha Término:</label>
            <DatePicker
              selected={formData.fecha_termino}
              onChange={(date) => handleChange('fecha_termino', date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="form-group">
            <label htmlFor="objetivos">Objetivos:</label>
            <input
              type="text"
              id="objetivos"
              name="objetivos"
              value={formData.objetivos}
              onChange={(e) => handleChange('objetivos', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoria">Categoría:</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={(e) => handleChange('categoria', e.target.value)}
              required
            >
              <option value="Asistencia Alimentaria">Asistencia Alimentaria</option>
              <option value="Atención Médica">Atención Médica</option>
              <option value="Educación">Educación</option>
              <option value="Desarrollo Comunitario">Desarrollo Comunitario</option>
              <option value="Protección del Medio Ambiente">Protección del Medio Ambiente</option>
              <option value="Asistencia en Desastres">Asistencia en Desastres</option>
              <option value="Derechos Humanos">Derechos Humanos</option>
              <option value="Apoyo Psicosocial">Apoyo Psicosocial</option>
              <option value="Rescate Animal y Promoción de Adopción">Rescate Animal y Promoción de Adopción</option>
              <option value="Asistencia a Adultos Mayores">Asistencia a Adultos Mayores</option>
              <option value="Construcción de Viviendas Sociales">Construcción de Viviendas Sociales</option>
              <option value="Desarrollo Recreativo Infantil">Desarrollo Recreativo Infantil</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <button type="submit">Subir Proyecto</button>
          {msg && <h2 className="errormsj">{msg}</h2>}
        </form>
      </div>
      <div>
        <section className="about-us" style={{ clear: 'both' }}>
          <p>
            Somos una plataforma que cree en el poder de la colaboración y el voluntariado. Nuestro objetivo es construir un mundo mejor conectando a personas y organizaciones con causas benéficas. Juntos, podemos marcar la diferencia.
          </p>
        </section>

        <footer className="footer">
          <p>&copy; Cause Connect</p>
        </footer>
      </div>
    </div>
  );
}

export default ProyectFrom;
