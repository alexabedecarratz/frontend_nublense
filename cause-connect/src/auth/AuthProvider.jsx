import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import * as jwtDecode from "jwt-decode";



function AuthProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("token")||null);
    const [userId, setUserId] = useState(localStorage.getItem("userId")||null);
    const [userType, setUserType] = useState(localStorage.getItem("userType")||null);
    const [userName, setUserName] = useState(localStorage.getItem("userName")||null);
    const [userFoto, setUserFoto] = useState(localStorage.getItem("userFoto")||null);
    const [userMail, setUserMail] = useState(localStorage.getItem("userMail")||null);
    const [nombreUsuario, setNombreUsuario] = useState(localStorage.getItem("nombreUsuario")||null);
    const [descripcionFundacion, setDescripcionFundacion] = useState(localStorage.getItem("descripcionFundacion")||null);
    const [contactoFundacion, setContactoFundacion] = useState(localStorage.getItem("contactoFundacion")||null);
    const [sitiowebFundacion, setSitiowebFundacion] = useState(localStorage.getItem("sitiowebFundacion")||null);
    const [proyect_userId, setProyectId] = useState(localStorage.getItem("proyect_userId")||null);

    useEffect(() => {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userType", userType);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userFoto", userFoto);
        localStorage.setItem("userMail", userMail);
        localStorage.setItem("nombreUsuario", nombreUsuario);
        localStorage.setItem("descripcionFundacion", descripcionFundacion);
        localStorage.setItem("contactoFundacion", contactoFundacion);
        localStorage.setItem("sitiowebFundacion", sitiowebFundacion);
        localStorage.setItem("proyect_userId", proyect_userId);

    }, [token, userId, descripcionFundacion, contactoFundacion, sitiowebFundacion, userName, userFoto, proyect_userId]);

    function logout() {
        setToken(null);
        setUserId(null);
        setUserType('');
        setUserName('');
        setUserFoto('');
        setNombreUsuario('');
        setDescripcionFundacion('');
        setContactoFundacion('');
        setUserMail('');
        setProyectId('');
        setSitiowebFundacion('')

    }

    const decodeToken = (token) => {
        try {
            const decodedToken = jwt_decode(token);
            console.log(decodedToken);
            const { sub } = decodedToken;
            return sub;
        } catch (error) {
            console.log("Error decoding token:", error);
            return null;
        }
    };

    const login = (token) => {
        setToken(token);
        const decodedUserId = decodeToken(token);
        setUserId(decodedUserId);
    };

    const getType = (tipo)=> {
        setUserType(tipo);
        console.log(tipo);
        console.log(`tipo: ${userType}`);
    };

    const getName = (nombre) => {
        setUserName(nombre)
    };    

    const getProyectId = (id)=> {
        setProyectId(id);
    };

    const getFoto = (foto)=> {
        setUserFoto(foto);
        console.log(foto);
        console.log(userFoto);
    };

    const getUserName= (nombre_usuario)=> {
        setNombreUsuario(nombre_usuario);
    };

    const getUserMail = (mail) => {
        setUserMail(mail);
    }

    const getDatosFundacion = (fundacion)=> {
        setDescripcionFundacion(fundacion.descripcion);
        setContactoFundacion(fundacion.contacto);
        setSitiowebFundacion(fundacion.sitio_web);
    };

    return (
        <AuthContext.Provider value={{
            logout, 
            token, 
            setToken, 
            userId, 
            setUserId,
            userType,
            setUserType,
            login,
            getType,
            userName,
            setUserName,
            userFoto,
            setUserFoto,
            getName,
            getFoto,
            getUserName,
            nombreUsuario,
            setNombreUsuario,
            descripcionFundacion,
            contactoFundacion,
            sitiowebFundacion,
            getDatosFundacion,
            setProyectId,
            getProyectId,
            proyect_userId,
            getUserMail,
            userMail
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
