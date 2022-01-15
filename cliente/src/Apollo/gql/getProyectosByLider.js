import { gql } from '@apollo/client'

const GET_PROYECTOS_LIDER = gql`
    query getProyectosLider ($id: ID!) {
        getProyectosByLider(liderProyecto: $id){
        id
        nombreProyecto
        objGenerales
        objEspecificos
        presupuesto
        fechaInicio
        fechaFin
        estProyecto
        faseProyecto
        liderProyecto{
            id
            nombreUsuario}
        inscripciones{
            id
            _idUsuario
            nombreUsuario
            estinscripcion
            fechaIngreso
            fechaEgreso
            _idProyecto
            nombreProyecto}
        avances{
            id
            nombreUsuario
            fechaAvance
            descAvance
            obsLider}}
        }
    `;

export default GET_PROYECTOS_LIDER;