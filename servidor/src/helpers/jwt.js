import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET

export const generarJwt = (uid, nombreUsuario, rolUsuario, estUsuario) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            nombreUsuario,
            rolUsuario,
            estUsuario
        }
        jwt.sign(payload, secret, {expiresIn: "2h"},
            (err, token) => {
                if(err){
                    console.log(err),
                    reject("No se pudo generar el token")
                }
                resolve(token)
            })        
    })
}
