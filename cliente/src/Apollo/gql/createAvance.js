import { gql } from '@apollo/client'

const CREATE_AVANCE = gql`
    mutation createAvance ($id: ID!, $descripcion: String) {
        UpdateProyectoByAvances (_id: $id, input: { 
            descAvance: $descripcion
        }) {
        avances {
            id
            nombreUsuario
            fechaAvance
            descAvance
            obsLider
        }}
    }
    `;

export default CREATE_AVANCE;