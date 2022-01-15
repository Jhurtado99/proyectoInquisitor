import { useQuery } from "@apollo/client";
import React from "react";
import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap';
import GET_PROYECTOS_LIDER from "../../Apollo/gql/getProyectosByLider";
import useAuth from '../../Hooks/useAuth';


const ProyectosLider = () => {

    const auth = useAuth();

    const user_id = auth.user.id;

    const { data, loading, error } = useQuery(GET_PROYECTOS_LIDER, {
        variables: { id: user_id },
        fetchPolicy: "network-only"
    });

    return (
        <>
            {loading && <p>Cargando ...</p>}
            {error && <p>Se ha producido un error</p>}
            {
                data &&
                <Card style={{ width: '70vw' }} id="card" text="light">
                    <Card.Header as="h4" className="text-center">Proyectos</Card.Header>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <Table bordered hover className="table" size="sm">
                                        <thead>
                                            <tr>
                                                <th>Proyecto</th>
                                                <th>Presupuesto</th>
                                                <th>Fecha Inicio</th>
                                                <th>Fecha Fin</th>
                                                <th>Fase</th>
                                                <th>Estado</th>
                                                <th>Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.getProyectosByLider.map((project, index) => (
                                                    <tr key={project.id}>
                                                        <td>{project.nombreProyecto}</td>
                                                        <td>{project.presupuesto}</td>
                                                        <td>{project.fechaInicio}</td>
                                                        <td>{project.fechaFin}</td>
                                                        <td>{project.faseProyecto}</td>
                                                        <td>{project.estProyecto}</td>
                                                        <td><Button variant="info" size="sm" href={`/proyectos/${project.id}`}>Revisar</Button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 3, offset: 3 }}>
                                    <div className="edit_button justify-content-center">
                                        <Button className="botonsito" variant="primary" href="/inscripciones/lider">Ver Inscripciones</Button>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="edit_button justify-content-center">
                                        <Button className="botonsito" variant="primary" type="submit" href="/proyectos/crear">Crear Proyecto</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>}
        </>
    )

}

export default ProyectosLider;