import { gql } from '@apollo/client'

const UPDATE_FASE = gql`
    mutation updateFase ($id: ID!) {
        UpdateProyectoByFase (_id: $id) {
            id 
            faseProyecto
            estProyecto
        }
    }
    `;

export default UPDATE_FASE;