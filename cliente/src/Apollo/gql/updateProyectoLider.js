import { gql } from '@apollo/client'

const CREATE_PROYECTO = gql`
    mutation updateProyectoLider ($id: ID!, $nombre: String, $generales: String, $especificos: String, $presupuesto: Int) {
        UpdateProyectoLider (_id: $id, input: {
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