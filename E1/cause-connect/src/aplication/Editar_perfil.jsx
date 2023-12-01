import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Editar_perfil.css';

function EditProfile() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contrasena: '',
    foto: '',
    role: 'voluntario',
  });

  const [msg, setMsg] = useState('');

  // Función para cargar el perfil del usuario
  const loadUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user'); // Reemplaza con la ruta correcta para obtener el perfil del usuario
      const user = response.data; // Supongamos que la respuesta contiene los datos del usuario
      setFormData(user);
    } catch (error) {
      console.error('Error al cargar el perfil del usuario:', error);
    }
  };

  useEffect(() => {
    loadUserProfile(); // Carga el perfil del usuario cuando se monta el componente
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put('http://localhost:3000/user', formData); // Reemplaza con la ruta correcta para actualizar el perfil del usuario
      if (response.status === 200) {
        window.location.href = '/welcome';
        setMsg('Perfil actualizado con éxito');
      } else {
        setMsg('Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setMsg('Error al actualizar el perfil');
    }
  };

  return (
    <div>
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
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="foto">Foto (opcional):</label>
          <input
            type="text"
            id="foto"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Rol:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="voluntario">Voluntario</option>
            <option value="fundación">Fundación</option>
          </select>
        </div>
        <button type="submit">Guardar Cambios</button>
        {msg && <h2 className="errormsj">{msg}</h2>}
      </form>
    </div>
  );
}

export default EditProfile;
