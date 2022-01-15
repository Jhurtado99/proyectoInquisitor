import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';

import Home from '../Pages/Utiles/Home';
import Navbarcom from '../Components/Navbarcom';
import Footer from '../Components/Footer';
import Usuarios from '../Pages/Usuarios';
import Perfil from '../Pages/Perfil';
import Proyectos from '../Pages/Proyecto/Proyectos';
import Inscripciones from '../Pages/Inscripcion/Inscripciones';
import ListarProyectos from '../Pages/Proyecto/ListarProyectos';
import ProyectosLider from '../Pages/Proyecto/ProyectosLider';


class ContentRouter extends Component {
    render() {
        return (
            <>
                <Navbarcom />
                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/inscripciones/:action' component={Inscripciones} />
                    <Route path='/listar-proyectos' component={ListarProyectos} />
                    <Route path='/listarProyectos' component={ProyectosLider} />
                    <Route path='/perfil' component={Perfil} />
                    <Route path='/proyectos/:action' component={Proyectos} />
                    <Route path='/proyectos' component={Proyectos} />
                    <Route path='/usuarios' component={Usuarios} />
                </Switch>
                <Footer />
            </>
        )
    }
}

export default ContentRouter;