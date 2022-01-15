import { gql } from '@apollo/client'

const UPDATE_AVANCE_OBS = gql`
    mutation updateAvance ($id: ID!, $idavance: ID!, $descripcion: String) {
        UpdateProyectoByObsLider (_id: $id, avances: $idavance, input: {
            obsLider: $descripcion
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

export default UPDATE_AVANCE_OBS;