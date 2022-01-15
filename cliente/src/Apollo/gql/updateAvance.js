import { gql } from '@apollo/client'

const UPDATE_AVANCE = gql`
    mutation updateAvance ($id: ID!, $idavance: ID!, $descripcion: String) {
        UpdateProyectoByAvanceEst (_id: $id, avances: $idavance, input: {
            descAvance: $descripcion
        }) {
            id
            nombreProyecto
            avances{
                id
                nombreUsuario
                fechaAvance
                descAvance
                obsLider
            }
        }
    }
    `;

export default UPDATE_AVANCE;