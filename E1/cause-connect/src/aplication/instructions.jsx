import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Instructions.css';
import logo from '../assets/corazon_rojo.jpg';

function Instructions() {
  const [step, setStep] = useState(0);
  const instructions = [
    "Gracias por utilizar nuestra plataforma. A continuación, encontrarás una guía que te ayudará a entender cada una de las características de la aplicación.",
    "Para tener acceso completo a todas las funcionalidades, necesitarás crear una cuenta. Haz clic en 'Registrarse' y sigue los pasos indicados.",
    "Si ya tienes una cuenta, simplemente haz clic en 'Iniciar Sesión' e introduce tus credenciales.",
    "Una vez dentro, podrás explorar diferentes fundaciones. Usa los filtros para buscar fundaciones por área de interés o ubicación.",
    "Puedes conectarte con las fundaciones a través de un chat dedicado o seguir a una fundación para recibir actualizaciones.",
    "Descubre oportunidades de voluntariado en la sección 'Oportunidades'. Aquí podrás apuntarte para actividades que te interesen.",
    "Lee y comparte historias inspiradoras en la sección 'Historias de Impacto' para ver cómo estás contribuyendo a un cambio positivo."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < instructions.length) {
        setStep(step + 1);
      }
    }, 300);  // 3000ms = 3 segundos

    return () => clearTimeout(timer);
  }, [step, instructions.length]);

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

      <div className="container">
        <div className="header-container">
            <Link to="/welcome">
          <img className="logo" src={logo} alt="Logo" /> 
          <h1 className="header">Instrucciones</h1>
          </Link>
        </div>
        <div>
          {instructions.slice(0, step).map((instruction, index) => (
            <p className="slide-in-from-right" key={index}>{instruction}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Instructions;
