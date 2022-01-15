import Usuario from "../model/Usuario";
import Proyecto from "../model/Proyecto";
import bcryp from "bcrypt";
import { generarJwt, payload } from "../helpers/jwt";
//import jwt from "jsonwebtoken";
//import { validarJwt } from "../middleware/validar-jwt";
//import { parse } from "dotenv";
//import { parseType } from "graphql";

const secret = process.env.SECRET;

export const resolvers = {
  Query: {
    async Usuarios(__, args, context) {
      console.log("Rol", context.rol);
      if (context.rol == "Lider") {
        return await Usuario.find({ rolUsuario: "Estudiante" });
      } else if (context.rol == "Administrador") {
        return await Usuario.find();
      } else {
        return await null;
      }
    },
    async getUsuarios(__, { _id }) {
      return await Usuario.findById(_id);
    },
    async getUsuariosByRol(__, rolUsuario, context) {
      if (context.rol == "Lider") {
        return await Usuario.find(rolUsuario);
      } else {
        return await null;
      }
    },
    async getProyectosAdmin(__, args, context) {
      return Proyecto.find().populate(
        "liderProyecto",
        "nombreUsuario dniUsuario"
      );
    },
    async getProyectosEst(__, { estProyecto }, context) {
      if (context.rol == "Estudiante") {
        return Proyecto.find({ estProyecto }).populate(
          "liderProyecto",
          "nombreUsuario dniUsuario"
        );
      } else {
        return await null;
      }
    },
    async getProyectosEstAvance(__, { _id, inscripciones }, context) {
      console.log(
        "ID:",
        _id,
        "Inscripciones",
        inscripciones._idUsuario,
        inscripciones.estinscripcion
      );
      if (context.rol == "Estudiante") {
        return await Proyecto.find().populate(
          "liderProyecto",
          "nombreUsuario dniUsuario"
        );
      } else {
        return await null;
      }
    },
    async getProyectos(__, { _id }) {
      return await Proyecto.findById(_id).populate(
        "liderProyecto",
        "nombreUsuario"
      );
    },
    async getProyectosByLider(__, { liderProyecto }, context) {
      if (context.uid == liderProyecto) {
        return await Proyecto.find({ liderProyecto }).populate(
          "liderProyecto",
          "nombreUsuario"
        );
      } else {
        return await null;
      }
    },
    async getProyectoByLider(__, { _id }, context) {
      if (context.rol == "Lider") {
        return await Proyecto.findById(_id).populate(
          "liderProyecto",
          "nombreUsuario"
        );
      } else {
        return await null;
      }
    },
    async getProyectosByInscripciones(
      __,
      { liderProyecto, inscripciones },
      context
    ) {
      if (context.uid == liderProyecto) {
        console.log(context.uid, " ", liderProyecto);
        return await Proyecto.find(
          { liderProyecto },
          { inscripciones }
        ).populate("liderProyecto", "nombreUsuario");
      } else {
        return await null;
      }
    },
    async Login(__, { correoUsuario, passUsuario }) {
      const usuario = await Usuario.findOne({
        correoUsuario,
      });
      // console.log(usuario);
      if (!usuario) {
        return "Usuario o Contraseña incorrecta";
      }
      const validarPassword = bcryp.compareSync(
        passUsuario,
        usuario.passUsuario
      );
      if (validarPassword) {
        const token = await generarJwt(
          usuario.id,
          usuario.nombreUsuario,
          usuario.rolUsuario,
          usuario.estUsuario
        );
        if (usuario.estUsuario == "Autorizado") {
          return {
            token: token,
            id: usuario.id,
            nombreUsuario: usuario.nombreUsuario,
            rolUsuario: usuario.rolUsuario
          };
        }
      }
      console.log("Usuario no autorizado");
      return "Usuario no autorizado";
    },
  },
  Mutation: {
    async CreateUsuario(__, { usuario }) {
      const salt = bcryp.genSaltSync();
      let nUsuario = new Usuario(usuario);
      nUsuario.passUsuario = bcryp.hashSync(usuario.passUsuario, salt);
      return await nUsuario.save();
    },
    async CreateProyecto(__, { proyecto }, context) {
      if (context.rol == "Lider") {
        proyecto.liderProyecto = context.uid;
        let nProyecto = new Proyecto(proyecto);
        return await nProyecto.save();
      } else {
        return await null;
      }
    },
    async UpdateUsuario(__, { _id, input }) {
      const salt = bcryp.genSaltSync();
      input.passUsuario = bcryp.hashSync(input.passUsuario, salt);
      return await Usuario.findOneAndUpdate({ _id }, input, { new: true });
    },
    async UpdateUsuarioByEdo(__, { _id, input }, context) {
      if (context.rol == "Administrador" || context.rol == "Lider") {
        return await Usuario.findOneAndUpdate({ _id }, input, { new: true });
      } else {
        return await null;
      }
    },
    async UpdateUsuarioByRol(__, { _id, input }) {
      return await Usuario.findOneAndUpdate({ _id }, input, { new: true });
    },
    async UpdateProyectoLider(__, { _id, input }, context) {
      if (context.rol == "Lider") {
        return await Proyecto.findOneAndUpdate({ _id }, input, {
          new: true,
        }).populate("liderProyecto", "nombreUsuario");
      } else {
        return await null;
      }
    },
    async UpdateProyectoByEdo(__, { _id, input }, context) {
      if (context.rol == "Administrador") {
        return await Proyecto.findOneAndUpdate({ _id }, input, { new: true }
        ).populate("liderProyecto", "nombreUsuario");
      } else {
        return await null;
      }
    },
    async UpdateProyectoByFase(__, { _id }, context) {
      if (context.rol == "Estudiante") {
        return await Proyecto.findOneAndUpdate(
          { _id },
          { $set: { faseProyecto: "En desarrollo" } },
          { new: true }
        ).populate("liderProyecto", "nombreUsuario");
      } else {
        return await null;
      }
    },
    async UpdateProyectoByFaseIniciado(__, { _id }, context) {
      let fecha = Date.now();
      if (context.rol == "Administrador") {
        return await Proyecto.findOneAndUpdate(
          { _id },
          { $set: { fechaInicio: fecha, faseProyecto: "Iniciado", estProyecto: "Activo" } },
          { new: true }
        ).populate("liderProyecto", "nombreUsuario");
      } else {
        return await null;
      }
    },
    async UpdateProyectoByFaseTerminado(__, { _id }, context) {
      let fecha = Date.now();
      if (context.rol == "Administrador") {
        return await Proyecto.findOneAndUpdate(
          { _id },
          { $set: { fechaFin: fecha, faseProyecto: "Terminado", estProyecto: "Inactivo" } },
          { new: true }
        ).populate("liderProyecto", "nombreUsuario");
      } else {
        return await null;
      }
    },
    async UpdateProyectoByInscripcionEst(__, { _id, input }, context) {
      if (context.rol == "Estudiante") {
        const inscripciones = {
          _idUsuario: context.uid,
          nombreUsuario: context.name,
          nombreProyecto: input.nombreProyecto,
          _idProyecto: _id,
        };
        return await Proyecto.findOneAndUpdate(
          { _id },
          { $push: { inscripciones } },
          { new: true }
        ).populate("liderProyecto", "nombreUsuario");
      } else {
        return await null;
      }
    },
    async UpdateProyectoByAvances(__, { _id, input }, context) {
      if (context.rol == "Estudiante") {
        const avances = {
          nombreUsuario: context.name,
          descAvance: input.descAvance,
          obsLider: null,
        };
        return await Proyecto.findOneAndUpdate(
          { _id },
          { $push: { avances } },
          { new: true }
        ).populate("liderProyecto", "nombreUsuario");
      } else {
        return await null;
      }
    },
    async UpdateProyectoByEstInscripcion(__, {_id, inscripciones, input }, context){
      let fecha = Date.now();
      if (context.rol == "Lider") {
        const estinscripcion = input.estinscripcion;
        return await Proyecto.findOneAndUpdate(
          { $and: [{ _id: _id, "inscripciones._id": inscripciones }] },
          { $set: { "inscripciones.$.estinscripcion": estinscripcion, "inscripciones.$.fechaIngreso": fecha } },
          { new: true }).populate("liderProyecto", "nombreUsuario");
      } else {
        return await null;
      }
    },
    async UpdateProyectoByAvanceEst(__, { _id, avances, input }, context) {
      //console.log("Avances ID: ", avances, "input", input.descAvance )
      if (context.rol == "Estudiante") {
      const descripcion = input.descAvance;
      return await Proyecto.findOneAndUpdate(
        {$and:[{ '_id': _id, 'avances._id': avances }]},
        { $set: { 'avances.$.descAvance': descripcion } },
        { new: true }
      ).populate("liderProyecto", "nombreUsuario");
      } else {
        return await null;
      }
    },
    async UpdateProyectoByObsLider(__, { _id, avances, input }, context) {
      if (context.rol == "Lider") {
        const observacion = input.obsLider;
        return await Proyecto.findOneAndUpdate(
          { $and: [{ _id: _id, "avances._id": avances }] },
          { $set: { "avances.$.obsLider": observacion } },
          { new: true }
        ).populate("liderProyecto", "nombreUsuario");
      } else {
        return await null;
      }
    },
  },
};
