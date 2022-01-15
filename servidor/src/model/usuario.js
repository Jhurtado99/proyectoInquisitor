import { Schema, model } from "mongoose";

const UsuarioSchema = Schema({
  correoUsuario: {
    type: String,
    required: true,
    unique: true
  },
  dniUsuario: {
    type: String,
    required: true,
    unique: true
  },
  nombreUsuario: {
    type: String,
    required: true,
  },
  passUsuario: {
    type: String,
    required: true
  },
  rolUsuario: {
    type: String,
    required: true,
  },
  estUsuario: {
    type: String,
    default: "Pendiente",
  }
});

export default model("Usuario", UsuarioSchema);

