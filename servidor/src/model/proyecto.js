import { Schema, model } from "mongoose";

const ProyectoSchema = Schema({
  nombreProyecto: {
    type: String,
    required: true,
    unique: true,
  },

  objGenerales: {
    type: String,
    required: true,
  },

  objEspecificos: {
    type: String,
    required: true,
  },

  presupuesto: {
    type: Number,
    required: false,
  },

  fechaInicio: {
    type: Date,
  },

  fechaFin: {
    type: Date,
  },

  liderProyecto: { 
    type: Schema.Types.ObjectId, 
    ref: 'Usuario',
    required: true 
  },

  estProyecto: {
    type: String,
    default: "Inactivo",
  },

  faseProyecto: {
    type: String,
    default: "Nula",
  },

  inscripciones: [{

    _idUsuario: {
      type: String
    },

    nombreUsuario: {
      type: String,
    },

    _idProyecto: {
      type: Schema.Types.ObjectId, 
      ref: 'Proyecto',
    },

    nombreProyecto: {
      type: String,
    },

    estinscripcion: {
      type: String,
      default: "Pendiente",
    },

    fechaIngreso: {
      type: Date,
    },

    fechaEgreso: {
      type: Date,
    },
    
  }],
  
  avances: [{

    nombreUsuario: {
      type: String
    },

    fechaAvance: {
      type: Date,
      default: Date.now()
    },

    descAvance: {
      type: String,
    },

    obsLider: {
      type: String,
    },

  }]
});

export default model("Proyecto", ProyectoSchema);
