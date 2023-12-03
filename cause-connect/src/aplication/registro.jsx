import React, { useState } from 'react';
import axios from 'axios';
import './registro.css';
import { useNavigate } from 'react-router-dom';
import bear from '../assets/Avatars/bear.png';
import boy from '../assets/Avatars/boy.png';
import chicken from '../assets/Avatars/chicken.png';
import dog from '../assets/Avatars/dog.png';
import gamer from '../assets/Avatars/gamer.png';
import human from '../assets/Avatars/human.png';
import man from '../assets/Avatars/man.png';
import rabbit from '../assets/Avatars/rabbit.png';
import woman from '../assets/Avatars/woman.png';

function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    nombre_usuario:'',
    contrasena: '',
    foto: '', // Puedes agregar un campo para la foto si es necesario
    tipo: 'voluntario',
  });

  const handleImageClick = (selectedImage) => {
    setFormData({
      ...formData,
      foto: selectedImage,
    });
  };

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


  const [registroExitoso, setRegistroExitoso] = useState(false);

  const [msg, setMsg] = useState('');

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
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        nombre: formData.nombre,
        mail: formData.email,
        nombre_usuario: formData.nombre_usuario,
        contrasena: formData.contrasena,
        foto: formData.foto,
        tipo: formData.tipo,
        fundacion: ''
      });

      if (response.status === 201) {
        setMsg('Usuario registrado con éxito');
        setRegistroExitoso(true);
        navigate('/login')

      } else {
        setMsg('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setMsg('Error al registrar el usuario');
    }
  }



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
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="nombre_usuario">Nombre de usuario:</label>
            <input
              type="text"
              id="nombre_usuario"
              name="nombre_usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
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
          <div className="image-options">
            <label htmlFor="foto">Foto de Perfil:</label>
            {imageOptions.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Opción ${index + 1}`}
                onClick={() => handleImageClick(imageUrl)}
                className={formData.foto === imageUrl ? 'selected' : ''}
                style={{ maxWidth: '100px', maxHeight: '100px' }}
                required
              />
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Tipo:</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            >
              <option value="voluntario">Voluntario</option>
              <option value="fundación">Fundación</option>
            </select>
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

export default RegistrationForm;