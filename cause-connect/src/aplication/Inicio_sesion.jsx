import { useState, useContext } from "react";
import './Inicio_sesion.css';
import logo from '../assets/logo.png';
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const { setToken, setUserId, login, userId, getType, getName, getFoto, getUserName, getDatosFundacion, getUserMail } = useContext(AuthContext);
    const [mail, setEmail] = useState("");
    const [contrasena, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");


    const obtenerUserType = async (mail, token) => {
      try {
          const response = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/user/${mail}`,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
          return response.data;
      } catch (error) {
          console.log(error);
      }
  };

  const obtenerFundacionId = async (mail, token) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user/getFundacionID/${mail}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

  const obtenerDatosUser = async (mail, token) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user/getDatosUser/${mail}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
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
        console.log("Apretaste el formulario");

        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            mail,
            contrasena
          });
          if (response.status === 200) {
            // Login exitoso, puedes redirigir al usuario o realizar otras acciones
            setMensaje("Inicio de sesión exitoso");
            console.log(response.data)
            const access_token  = response.data.access_token;
            setToken(access_token);

            const userType = await (async () => {
              try {
                const respuesta = await obtenerUserType(mail, access_token);
                return respuesta.tipo
              } catch (error) {
                console.log(error);
              }
            })();

            const fundacionId = await (async () => {
                try {
                  const respuesta = await obtenerFundacionId(mail, access_token);
                  return respuesta.fundacion
                } catch (error) {
                  console.log(error);
                }
              })();

            const nombre =  await (async () => {
                try {
                  const respuesta = await obtenerDatosUser(mail, access_token);
                  return respuesta.nombre
                } catch (error) {
                  console.log(error);
                }
              })();
            
            const nombre_usuario = await (async () => {
                try {
                  const respuesta = await obtenerDatosUser(mail, access_token);
                  return respuesta.nombre_usuario
                } catch (error) {
                  console.log(error);
                }
              })();
            
            const foto = await (async () => {
                try {
                  const respuesta = await obtenerDatosUser(mail, access_token);
                  return respuesta.foto
                } catch (error) {
                  console.log(error);
                }
              })();

            getUserMail(mail);
            login(access_token);
            getType(userType);
            console.log(`hola ${nombre}`);
            console.log(`hola ${foto}`);
            console.log(`usuario ${nombre_usuario}`);
            getName(nombre);
            getFoto(foto);
            getUserName(nombre_usuario);
            
            if (fundacionId !== null) {
              const datos_fundacion = await obtenerDatosFundacion(fundacionId);
              getDatosFundacion(datos_fundacion);
            }


            if (fundacionId === null) {
                if (userType === 'fundación') {
                    // Redirige a la página de detalles de fundación
                    console.log('dentro de fundacion')
                    navigate('/registro_fundacion');
                  } else {
                    navigate('/pagina_principal');
                  }
            } else {
                navigate('/pagina_principal');
            }

        } else {
            // La respuesta no es exitosa
            setMensaje("Error en el inicio de sesión. Por favor, verifica tus credenciales.");
        }
        } catch (error) {
            // Manejar errores de la petición
            console.error("Error en la petición de inicio de sesión:", error);
            setMensaje("Error en el inicio de sesión. Usuario o contraseña son incorrectos.");
        }
    }



    return (
        <div className="pagina-inicio-sesion">
            {/* Barra de navegación */}
            <nav className="navbar">
                <a href="/pagina_principal">Inicio</a>
                <a href="/welcome">Bienvenida</a>
                <a href="/Instructions">Instrucciones</a>
                <a href="/contacto">Contacto</a>
                <a href='/registro'>Registro</a>
                <a href='/login'>Iniciar sesión</a>
            </nav>
            {/* Aquí termina la barra de navegación */}
            
            <header className="header">
              <div className="header-content">

                <img src={logo} alt="Logo de Cause Connect" className="logo" />
                <h1>Cause Connect</h1>
                <p>Conectando fundaciones y voluntarios para cambiar vidas</p>
                <h2>Iniciar Sesión</h2>
              </div>
            </header>
            <div className="content-container">
                <div className="Login">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="mail"
                                value={mail}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Contraseña:
                            <input
                                type="password"
                                name="contrasena"
                                value={contrasena}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <input type="submit" value="Iniciar Sesión" />
                    </form>
                    {mensaje && <p>{mensaje}</p>}
                </div>
            </div>
        </div>
    )
};

export default LoginForm;