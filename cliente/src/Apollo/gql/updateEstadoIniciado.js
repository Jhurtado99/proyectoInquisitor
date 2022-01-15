import { gql } from '@apollo/client'

const UPDATE_ESTADO_INICIADO = gql`
    mutation updateEstadoIniciado ($id: ID!) {
        UpdateProyectoByFaseIniciado (_id: $id) {
            id 
            fechaInicio
            faseProyecto
            estProyecto
        }
    }
    `;

export default UPDATE_ESTADO_INICIADO;