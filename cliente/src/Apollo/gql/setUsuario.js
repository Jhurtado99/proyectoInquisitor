import { gql } from '@apollo/client'

const SET_USUARIO = gql`
        mutation setUsuario($email: String, $dni: String, $nombre: String, $password: String, $rol: String) {            
            CreateUsuario(usuario : {
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
                rolUsuario
                passUsuario
                estUsuario
            }               
        }
    `;

export default SET_USUARIO;