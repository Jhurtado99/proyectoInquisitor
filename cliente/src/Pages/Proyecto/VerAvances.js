import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import UPDATE_AVANCE from "../../Apollo/gql/updateAvance";
import UPDATE_AVANCE_OBS from "../../Apollo/gql/updateObsLider";
import useAuth from "../../Hooks/useAuth";

const VerAvances = ({ project }) => {

    const auth = useAuth();

    const rol = auth.user.rol;

    const avances = project.avances;
    const project_id = project.id;

    const [avance, setAvance] = useState(null);
    const [avanceObs, setAvanceObs] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    const [observacion, setObservacion] = useState("");

    const [updateAvance] = useMutation(UPDATE_AVANCE);
    const [makeObs] = useMutation(UPDATE_AVANCE_OBS);

    const handleSubmit = (event) => {
        event.preventDefault();

        updateAvance({ variables: { id: project_id, idavance: avance.id, descripcion: descripcion } })
        .then(setAvance(null));
        
    }

    const handleSubmitObs = (event) => {
        event.preventDefault();

        makeObs({ variables: { id: project_id, idavance: avanceObs.id, descripcion: observacion } })
        .then(setAvanceObs(null));
        

    }

    return (
        <Container>
            <Row>
                <Col>
                    <Table striped bordered hover className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Estudiante</th>
                                <th>Descripción</th>
                                {rol === "Lider" && <th>Descripción</th>}
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                avances.map((advance, index) => (
                                    <tr key={advance.id}>
                                        <td>{index + 1}</td>
                                        <td>{advance.nombreUsuario}</td>
                                        <td>{advance.descAvance}</td>
                                        {rol === "Lider" && <td>{advance.obsLider}</td>}
                                        <td>
                                            {rol === "Estudiante"
                                                ? <Button variant="primary" onClick={() => setAvance(advance)}>Editar</Button>
                                                : <Button variant="primary" onClick={() => setAvanceObs(advance)}>Añadir Observación</Button>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            {avanceObs &&
                <Container>
                    <Form onSubmit={handleSubmitObs}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicID">
                                    <Form.Label>Observación: </Form.Label>
                                    <Form.Control as="textarea" rows={2} onChange={(event) => setObservacion(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 4, offset: 2 }}>
                                <div className="edit_button justify-content-center">
                                    <Button className="botonsito" variant="primary" type="submit">Editar</Button>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="edit_button justify-content-center">
                                    <Button className="botonsito" variant="primary" onClick={() => setAvanceObs(null)}>Cancelar</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Container>}
                {avance &&
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicID">
                                    <Form.Label>Descripción del avance: </Form.Label>
                                    <Form.Control as="textarea" rows={2} defaultValue={avance.descAvance} onChange={(event) => setDescripcion(event.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 4, offset: 2 }}>
                                <div className="edit_button justify-content-center">
                                    <Button className="botonsito" variant="primary" type="submit">Editar</Button>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="edit_button justify-content-center">
                                    <Button className="botonsito" variant="primary" onClick={() => setAvance(null)}>Cancelar</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Container>}
        </Container>
    )

}

export default VerAvances;