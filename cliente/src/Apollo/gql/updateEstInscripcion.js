import { gql } from '@apollo/client'

const UPDATE_EST_INSCRIPCION = gql`
    mutation updateInscripcion ($id: ID!, $idinscripcion: ID!, $estado: String) {
        UpdateProyectoByEstInscripcion (_id: $id, inscripciones: $idinscripcion, input: {
            estinscripcion: $estado
        }) {
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
                nombreProyecto
                fechaIngreso
                fechaEgreso
                _idProyecto}
            avances{
                id
                nombreUsuario
                fechaAvance
                descAvance
                obsLider}}
    }
    `;

export default UPDATE_EST_INSCRIPCION;