import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Instructions from '../aplication/Instructions';
import PaginaPrincipal from '../aplication/pagina_principal';
import PaginaBienvenida from '../profile/PaginaBienvenida';
import RegistrationForm from '../aplication/registro';
import LoginForm from '../aplication/Inicio_sesion';
import EditProfile from '../aplication/Editar_perfil';
import UserCheck from '../protected/UserCheck';
import RegistrationFormFundacion from '../aplication/registro_fundacion';
import ProyectFrom from '../aplication/subir_proyecto';
import PerfilUser from '../aplication/perfil_user';
import PerfilProyecto from '../aplication/proyecto_solidario';


import App from './App'
import UserProfile from '../aplication/perfil_usuario';
import VistaPerfil from '../aplication/vista_usuario';

function Routing(){
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/Instructions'} element={<Instructions/>}/>
                <Route path={'/welcome'} element={<PaginaBienvenida/>}/>
                <Route path={'/pagina_principal'} element={<PaginaPrincipal/>}/>
                <Route path={'/registro'} element={<RegistrationForm/>}/>
                <Route path={'/'} element={<PaginaBienvenida/>}/>
                <Route path={'/login'} element={<LoginForm/>}/>
                <Route path={'/editar_perfil'} element={<PerfilUser/>}/>
                <Route path={'/verificar_token_scope'} element={<UserCheck/>}/>
                <Route path={'/registro_fundacion'} element={<RegistrationFormFundacion/>}/>
                <Route path={'/subir_proyecto'} element={<ProyectFrom/>}/>
                <Route path={'/perfil_usuario'} element={<UserProfile/>}/>
                <Route path={'/perfil_proyecto/:id'} element={<PerfilProyecto/>}/>


                <Route path={'/perfil_user'} element={<PerfilUser/>}/>
                <Route path={'/vista_usuario/:userId'} element={<VistaPerfil/>}/>

            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing
