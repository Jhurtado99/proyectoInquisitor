import React from "react";
import { Card } from 'react-bootstrap';
import '../Pages.css';
import { useParams } from "react-router-dom";

import InscripcionesEstudiante from "./InscripcionesEstudiante";
import InscripcionesLider from './InscripcionesLider';

const Inscripciones = () => {

    const { action } = useParams();

    return (
        <Card style={{ width: '70vw' }} id="card" text="light">
            <Card.Header as="h4" className="text-center">Inscripciones</Card.Header>
            <Card.Body>
                {action === 'estudiante'
                        ? <InscripcionesEstudiante />
                        : <InscripcionesLider />
                }
            </Card.Body>
        </Card>
    )
}

export default Inscripciones;