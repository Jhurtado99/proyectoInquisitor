import { gql } from '@apollo/client'

const UPDATE_USUARIO = gql`
        mutation updateUsuario($id: ID!, $email: String, $dni: String, $nombre: String, $password: String, $rol: String) {            
            UpdateUsuario(_id: $id, input : {
                correoUsuario: $email,
                dniUsuario: $dni,
                nombreUsuario: $nombre,
                passUsuario: $password,
                rolUsuario: $rol
            }) {
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

export default UPDATE_USUARIO;