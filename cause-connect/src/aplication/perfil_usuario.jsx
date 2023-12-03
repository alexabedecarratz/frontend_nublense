import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde 'react-router-dom' para crear el enlace de edición
import Post from './post';
import { AuthContext } from "../auth/AuthContext";

export default function UserProfile() {
    const { setToken, setUserId, login, userId, getType, getName, getFoto } = useContext(AuthContext);

    return (
        <div className="user-profile">
            <h1>Perfil de Usuario</h1>
            <div className="user-info">
                <h2>Información del Usuario</h2>
                <p>Nombre: {getName}</p>
                <p>Correo Electrónico: {getFoto}</p>
                <p>Fecha de Registro: {userId}</p>
            </div>
            <Link to="/editar_perfil"> {/* Agrega un enlace a la página de edición de perfil */}
                <button>Editar Perfil</button> {/* Botón para editar el perfil */}
            </Link>
            {/* <div className="user-posts">
                <h2>Publicaciones del Usuario</h2>
                {posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div> */}
        </div>
    );
}
