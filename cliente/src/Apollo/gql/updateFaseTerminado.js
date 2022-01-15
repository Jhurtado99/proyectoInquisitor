import { gql } from '@apollo/client'

const UPDATE_FASE_TERMINADO = gql`
    mutation updateFaseTerminado ($id: ID!, $estado: String) {
        UpdateProyectoByFaseTerminado (_id: $id) {
            id 
            faseProyecto
            estProyecto
        }
    }
    `;

export default UPDATE_FASE_TERMINADO;