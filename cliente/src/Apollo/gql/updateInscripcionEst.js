import { gql } from '@apollo/client'

const UPDATE_INSCRIPCION_EST = gql`
    mutation updateInscripcionEst ($id: ID!, $nombre: String) {
        UpdateProyectoByInscripcionEst (_id: $id, input: {
            nombreProyecto: $nombre
        }) {
            id 
            faseProyecto
            estProyecto
            inscripciones{
                id
                _idUsuario
                nombreUsuario
                estinscripcion
                nombreProyecto
                fechaIngreso
                fechaEgreso
                _idProyecto}
        }
    }
    `;

export default UPDATE_INSCRIPCION_EST;