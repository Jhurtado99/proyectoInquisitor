import { gql } from '@apollo/client'

const UPDATE_ESTADO = gql`
    mutation updateEstadoAdmin ($id: ID!, $estado: String) {
        UpdateProyectoByEdo (_id: $id, input: {
            estProyecto: $estado
        }) {
            id 
            faseProyecto
            estProyecto
        }
    }
    `;

export default UPDATE_ESTADO;