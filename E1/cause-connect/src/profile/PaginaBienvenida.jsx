import { useState, useEffect } from "react";
import imagen1 from '../assets/imagen1.png';
import imagen2 from '../assets/imagen2.jpeg';
import imagen3 from '../assets/imagen3.jpg';
import './PaginaBienvenida.css';
import logo from '../assets/noun-medical-2659411.jpg';
import LogoutButton  from '../profile/Logout';

export default function PaginaBienvenida() {
    const [nombre, setNombre] = useState(null);
    const [contrasena, setContrasena] = useState(null);
    const imagenes = [imagen1, imagen2, imagen3];
    const [imagenActual, setImagenActual] = useState(imagenes[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setImagenActual(imagenes[(imagenes.indexOf(imagenActual) + 1) % imagenes.length]);
        }, 6000); // Cambiará la imagen cada 6 segundos

        return () => {
            clearInterval(interval);
        };
    }, [imagenActual]);

    function handleChangeNombre(nombre) {
        setNombre(nombre);
    }
    function handleChangeContrasena(contrasena) {
        setContrasena(contrasena);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Registrando a ${nombre}`);
    }

    return (
        <div>
            <div>

              {/* Barra de navegación */}
              <nav className="navbar">
        <a href="/pagina_principal">Inicio</a>
        <a href="/welcome">Bienvenida</a>
        <a href="/Instructions">Instrucciones</a>
        <a href="/contacto">Contacto</a>
        <a href='/registro'> Registro </a>
        <a href='/login'> Iniciar sesion </a>
        <LogoutButton></LogoutButton>

      </nav>
      {/* Aquí termina la barra de navegación */}

            </div>
            <div className="centered-logo-container">
                <img src={logo} alt="Logo" />
                <h1>CauseConnect</h1>
            </div>

            <div className="centered-image-container">
                <img src={imagenActual} alt="Imagen relacionada" />
                <div className="overlay-box">
                    <h1>¿En qué consiste nuestra aplicación?</h1>
                    <h3>CauseConnect es una red social que tiene como objetivo unir a fundaciones comprometidas con causas benéficas y a voluntarios apasionados por hacer una diferencia. Proporcionaremos un espacio interactivo donde las fundaciones podrán presentar sus proyectos solidarios, describir sus misiones y resaltar a quienes benefician. Nuestra plataforma no solo fomentará la colaboración y el voluntariado, sino que también destacará historias de impacto y construirá una comunidad comprometida con el cambio positivo.</h3>
                </div>
            </div>

            <h3>Comienza haciendo un cambio, ¡regístrate!</h3>



        </div>
    );
}
