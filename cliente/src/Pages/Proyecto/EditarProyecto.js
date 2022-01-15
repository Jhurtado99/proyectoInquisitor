import React, { useState } from "react";
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import '../Pages.css';
import UPDATE_PROYECTO_LIDER from '../../Apollo/gql/updateProyectoLider';
import { useMutation } from "@apollo/client";


const EditarProyecto = ({ project }) => {

    const project_id = project.id; 

    const [updateProyectoLider] = useMutation(UPDATE_PROYECTO_LIDER);

    const [presupuesto, setPresupuesto] = useState(project.presupuesto);
    const [nombre, setNombre] = useState(project.nombreProyecto);
    const [generales, setGenerales] = useState(project.objGenerales);
    const [especificos, setEspecíficos] = useState(project.objEspecificos);

    const handlePresupuesto = (event) => {
        setPresupuesto(parseInt(event.target.value));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(nombre, generales, especificos, presupuesto);

        updateProyectoLider({ variables: { id: project_id, nombre: nombre, generales: generales, especificos: especificos, presupuesto: presupuesto } })
        .then(setTimeout(() => window.location.reload(), 1000))
        .catch(function (e) {
            console.log(e);
        });
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
            <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre del Proyecto</Form.Label>
                            <Form.Control type="text" defaultValue={project.nombreProyecto} onChange={(event) => setNombre(event.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Objetivos Generales</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={project.objGenerales} onChange={(event) => setGenerales(event.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicID">
                            <Form.Label>Objetivos Específicos</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={project.objEspecificos} onChange={(event) => setEspecíficos(event.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Presupuesto</Form.Label>
                            <Form.Control type="number" defaultValue={project.presupuesto} onChange={handlePresupuesto} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <div className="edit_button justify-content-center">
                            <Button className="botonsito" variant="primary" type="submit">Editar</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    )

}

export default EditarProyecto;