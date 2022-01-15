import React, { useState } from "react";
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
//import useAuth from "../../Hooks/useAuth";
import CREATE_PROYECTO from "../../Apollo/gql/createProyectos";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";


const CrearProyecto = () => {

    const history = useHistory();

    const [createProyecto] = useMutation(CREATE_PROYECTO);

    const [presupuesto, setPresupuesto] = useState("");
    const [nombre, setNombre] = useState("");
    const [generales, setGenerales] = useState("");
    const [especificos, setEspecíficos] = useState("");

    const handlePresupuesto = (event) => {
        setPresupuesto(parseInt(event.target.value));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        createProyecto({ variables: { nombre, generales, especificos, presupuesto } })
        .then(setTimeout(() => history.push('/listarProyectos'), 1000))
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
                            <Form.Control type="text" placeholder="Nombre del proyecto" onChange={(event) => setNombre(event.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Objetivos Generales</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Objetivos Generales" onChange={(event) => setGenerales(event.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicID">
                            <Form.Label>Objetivos Específicos</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Objetivos Específicos" onChange={(event) => setEspecíficos(event.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Presupuesto</Form.Label>
                            <Form.Control type="number" placeholder="Presupuesto" onChange={handlePresupuesto} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 4, offset: 2 }}>
                        <div className="edit_button justify-content-center">
                            <Button className="botonsito" variant="primary" type="submit">Finalizar creación</Button>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="edit_button justify-content-center">
                            <Button className="botonsito" variant="primary" href="/listarProyectos">Cancelar</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    )

}

export default CrearProyecto;