import { gql } from '@apollo/client'

const GET_PROYECTOS = gql`
    query getProyectos ($id: ID!) {
        getProyectos(_id: $id){
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
            fechaEgreso}
        avances{
            id
            nombreUsuario
            fechaAvance
            descAvance
            obsLider}}
        }
    `;

export default GET_PROYECTOS;