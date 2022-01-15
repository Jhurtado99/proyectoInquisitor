import { gql } from '@apollo/client'

const LOGIN_USUARIO = gql`
        query signIn($email: String!, $password: String!){            
            Login(correoUsuario: $email, passUsuario: $password) {
                token
                id
                nombreUsuario
                rolUsuario
            }     
        }
    `;

export default LOGIN_USUARIO;