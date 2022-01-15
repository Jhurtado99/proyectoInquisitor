import { gql } from '@apollo/client'

const GET_PROYECTOS_EST = gql`
    query {
        getProyectosEst(estProyecto: "Activo"){
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

export default GET_PROYECTOS_EST;