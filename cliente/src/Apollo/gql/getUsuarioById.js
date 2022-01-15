import { gql } from '@apollo/client'

const GET_USUARIO_BY_ID = gql`
        query getUsuarioId ($id: ID!) {            
            getUsuarios (_id: $id) {
                id
                correoUsuario
                dniUsuario
                nombreUsuario
                passUsuario
                rolUsuario
                estUsuario
            }               
        }
    `;

export default GET_USUARIO_BY_ID;