import { gql } from '@apollo/client'

const UPDATE_USUARIO_ESTADO = gql`
        mutation updateUsuarioEst($id: ID!, $estado: String) {            
            UpdateUsuarioByEdo(_id: $id, input: { 
                estUsuario: $estado
            }) {
                id
                correoUsuario
                dniUsuario
                nombreUsuario
                rolUsuario
                passUsuario
                estUsuario
            }               
        }
    `;

export default UPDATE_USUARIO_ESTADO;