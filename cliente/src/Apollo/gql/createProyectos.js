import { gql } from '@apollo/client'

const CREATE_PROYECTO = gql`
    mutation createProyectos ($nombre: String, $generales: String, $especificos: String, $presupuesto: Int) {
        CreateProyecto (proyecto: {
            nombreProyecto: $nombre, 
            objGenerales: $generales, 
            objEspecificos: $especificos, 
            presupuesto: $presupuesto
        }) {
        id
        liderProyecto {
            id
        }
        fechaInicio
        fechaFin
        estProyecto
        faseProyecto}
    }
    `;

export default CREATE_PROYECTO;