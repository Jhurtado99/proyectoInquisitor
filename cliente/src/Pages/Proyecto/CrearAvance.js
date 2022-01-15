import React, { useState } from "react";
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import CREATE_AVANCE from "../../Apollo/gql/createAvance";
import { useMutation } from "@apollo/client";
import UPDATE_FASE from "../../Apollo/gql/updateFase";


const CrearAvance = ({ project }) => {

    const projectid = project.id;

    const [descripcion, setDescripcion] = useState("");

    const [createAvance] = useMutation(CREATE_AVANCE);
    const [updateFase] = useMutation(UPDATE_FASE);

    const cambioFase = () => {
        if (project.avances.length === 0) {
            updateFase({ variables: {id: projectid}});
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        createAvance({ variables: {id: projectid, descripcion: descripcion}})
        .then(cambioFase, 500)
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
                            <Form.Group className="mb-3" controlId="formBasicID">
                                <Form.Label>Descripción del avance: </Form.Label>
                                <Form.Control as="textarea" rows={2} onChange={(event) => setDescripcion(event.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <div className="edit_button justify-content-center">
                                <Button className="botonsito" variant="primary" type="submit">Registrar Avance</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>
    )

}

export default CrearAvance;