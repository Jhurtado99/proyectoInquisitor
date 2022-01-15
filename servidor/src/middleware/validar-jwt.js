import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;
export const validarJwt = (req, res, next) => {
  let token = "";
  token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    console.log("Rechazado");
    req.user = { auth: false };
    return next();
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  try {
    const { uid, nombreUsuario, rolUsuario, estUsuario } = jwt.verify(token, secret);
    req.user = { auth: true };
    req.rol = rolUsuario;
    req.est = estUsuario;
    req.uid = uid;
    req.name = nombreUsuario;
    return next();
  } catch (error) {
    req.user = { auth: false };
    console.log("Rechazado");
    return next();
  }
};
