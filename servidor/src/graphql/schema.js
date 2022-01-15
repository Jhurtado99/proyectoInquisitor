import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";

import { Kind, GraphQLScalarType } from 'graphql'

const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value) // ast value is always in string format
      }
      return null
    }
  })
}

const tipeDefs = `
scalar Date
    type Query {
        Usuarios: [Usuario],
        getUsuarios(_id:ID!): Usuario,
        getUsuariosByRol(rolUsuario:String!): [Usuario],
        getProyectosAdmin:[Proyecto],
        getProyectosEst(estProyecto:String!):[Proyecto],
        getProyectosEstAvance(_id:ID!, inscripciones:InscripcionInput!):Proyecto,
        getProyectos(_id:ID!): Proyecto,
        getProyectosByLider(liderProyecto:ID!): [Proyecto],
        getProyectoByLider(_id:ID!): Proyecto,
        getProyectosByInscripciones(liderProyecto:ID!, inscripciones:InscripcionInput!): [Proyecto],
        Login(correoUsuario:String!, passUsuario: String!): LoginUsuario
    },        

    type Mutation{
        CreateUsuario(usuario: UsuarioInput): Usuario,
        CreateProyecto(proyecto: ProyectoInput): Proyecto,
        UpdateUsuario(_id:ID!, input: UsuarioInput): Usuario,
        UpdateUsuarioByEdo(_id:ID!, input: UsuarioInput): Usuario,
        UpdateUsuarioByRol(_id:ID!, input: UsuarioInput): Usuario,
        UpdateProyectoLider(_id:ID!, input: ProyectoInputLider): Proyecto,
        UpdateProyectoByEdo(_id:ID!, input: ProyectoInput): Proyecto,
        UpdateProyectoByFase(_id:ID!): Proyecto,
        UpdateProyectoByFaseIniciado(_id:ID!, input: ProyectoInput): Proyecto,
        UpdateProyectoByFaseTerminado(_id:ID!, input: ProyectoInput): Proyecto,
        UpdateProyectoByEstInscripcion(_id:ID!, inscripciones:ID!, input: InscripcionInput): Proyecto,
        UpdateProyectoByObsLider(_id:ID!, avances:ID, input: AvanceInput): Proyecto,
        UpdateProyectoByInscripcion(_id:ID!, input: InscripcionInput): Proyecto,
        UpdateProyectoByInscripcionEst(_id:ID!, input: InscripcionInput): Proyecto,
        UpdateProyectoByAvanceEst(_id:ID!, idAvance:ID!, descripcion: String): Proyecto,
        UpdateProyectoByAvances(_id:ID!, input: AvanceInput): Proyecto
    },

    type Usuario {
        id:ID,
        correoUsuario: String,
        dniUsuario: String,
        nombreUsuario: String,
        passUsuario: String,
        rolUsuario: String,
        estUsuario: String,
    }
    input UsuarioInput {
        correoUsuario: String,
        dniUsuario: String,
        nombreUsuario: String,
        passUsuario: String,
        rolUsuario: String,
        estUsuario: String,
    }
    type LoginUsuario {
      token: String,
      id: ID,
      nombreUsuario: String,
      rolUsuario: String,
  }
    type Proyecto {
        id: ID,
        nombreProyecto: String,
        objGenerales: String,        
        objEspecificos: String,        
        presupuesto: Int,
        fechaInicio: Date,
        fechaFin: Date,
        liderProyecto: Usuario,        
        estProyecto: String,
        faseProyecto: String,
        inscripciones: [Inscripcion],
        avances: [Avance]        
    }
    input ProyectoInput {
        nombreProyecto: String,
        objGenerales: String,        
        objEspecificos: String,        
        presupuesto: Int,
        fechaInicio: Date,
        fechaFin: Date,
        liderProyecto: ID,        
        estProyecto: String,
        faseProyecto: String,
        inscripciones: [InscripcionInput],
        avances: [AvanceInput]    
    }
    input ProyectoInputLider {
      nombreProyecto: String,
      objGenerales: String,        
      objEspecificos: String,        
      presupuesto: Int,  
  }
    type Inscripcion {
        id:ID,
        _idUsuario: String,
        nombreUsuario: String,
        estinscripcion: String,
        fechaIngreso: Date,
        fechaEgreso: Date,
        _idProyecto: ID,
        nombreProyecto: String
    }
    input InscripcionInput {
        _idUsuario: String,
        nombreUsuario: String,
        estinscripcion: String,
        fechaIngreso: Date,
        _idProyecto: ID,
        nombreProyecto: String,
        fechaEgreso: Date
    }
    type Avance {
        id:ID,
        nombreUsuario: String,
        fechaAvance: Date,
        descAvance: String,
        obsLider: String
    }
    input AvanceInput {
        nombreUsuario: String,
        fechaAvance: Date,
        descAvance: String,
        obsLider: String
    }
    type Lider {
      id:ID,
      nombreUsuario: String,
      dniUsuario: String
    }
    input LiderInput{
      id:ID,
      nombreUsuario: String,
      dniUsuario: String
    }

`;

export default makeExecutableSchema({
  typeDefs: tipeDefs,
  resolvers: resolvers,
});
