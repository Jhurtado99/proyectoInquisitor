import { gql } from '@apollo/client'

const GET_USUARIOS = gql`
        query {            
            Usuarios {
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

export default GET_USUARIOS;