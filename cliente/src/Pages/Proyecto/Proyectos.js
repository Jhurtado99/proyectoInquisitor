import React from "react";
import { Card } from 'react-bootstrap';
import '../Pages.css';
import { useParams } from "react-router-dom";

import VerProyecto from "./VerProyecto";
import CrearProyecto from "./CrearProyecto";

const Proyectos = () => {

    const { action } = useParams();

    return (
        <Card style={{ width: '70vw' }} id="card" text="light">
            <Card.Header as="h4" className="text-center">Proyectos</Card.Header>
            <Card.Body>
                {action === 'crear'
                        ? <CrearProyecto />
                        : <VerProyecto proyectid={action} />
                }
            </Card.Body>
        </Card>
    )
}

export default Proyectos;