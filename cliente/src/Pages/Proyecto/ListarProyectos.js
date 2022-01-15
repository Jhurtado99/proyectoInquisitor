import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap';
import GET_PROYECTOS_TODOS from "../../Apollo/gql/getProyectosTodos";
import UPDATE_ESTADO from "../../Apollo/gql/updateEstadoAdmin";
import UPDATE_ESTADO_INICIADO from "../../Apollo/gql/updateEstadoIniciado";
import UPDATE_FASE_TERMINADO from "../../Apollo/gql/updateFaseTerminado";
import useAuth from "../../Hooks/useAuth";


const ListarProyectos = () => {

    const auth = useAuth();

    const rol = auth.user.rol;

    const { data, loading, error } = useQuery(GET_PROYECTOS_TODOS, {
        fetchPolicy: "network-only"
    });

    const [updateEstadoAdmin] = useMutation(UPDATE_ESTADO, {
        refetchQueries: [{ query: GET_PROYECTOS_TODOS }] 
    });
    const [updateEstadoIniciado] = useMutation(UPDATE_ESTADO_INICIADO, {
        refetchQueries: [{ query: GET_PROYECTOS_TODOS }] 
    });
    const [updateFaseTerminado] = useMutation(UPDATE_FASE_TERMINADO, {
        refetchQueries: [{ query: GET_PROYECTOS_TODOS }] 
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
                                                data.getProyectosAdmin.map((project, index) => (
                                                    <tr key={project.id}>
                                                        <td>{project.nombreProyecto}</td>
                                                        <td>{project.presupuesto}</td>
                                                        <td>{project.fechaInicio}</td>
                                                        <td>{project.fechaFin}</td>
                                                        <td>{project.faseProyecto}</td>
                                                        <td>{project.estProyecto}</td>
                                                        <td>
                                                            <div>
                                                                {rol ==="Estudiante" && <Button variant="info" size="sm" href={`/proyectos/${project.id}`}>Revisar</Button>} {' '}
                                                                {(rol === "Administrador" && project.faseProyecto === "En desarrollo")
                                                                    && <Button variant="success" className="usuarios" size="sm" onClick={() => updateFaseTerminado({ variables: {id: project.id}})}>Terminado</Button>} {' '}
                                                                {(rol === "Administrador" && project.faseProyecto === "Nula")
                                                                    ? <Button variant="warning" className="usuarios" size="sm" onClick={() => updateEstadoIniciado({ variables: {id: project.id}})}>Activar</Button>
                                                                    : (rol === "Administrador" && project.estProyecto === "Inactivo")
                                                                        ? <Button variant="warning" className="usuarios" size="sm" onClick={() => updateEstadoAdmin({ variables: {id: project.id, estado: "Activo"}})}>Activar</Button>
                                                                        : (rol === "Administrador" && project.estProyecto === "Activo")
                                                                            && <Button variant="warning" className="usuarios" size="sm" onClick={() => updateEstadoAdmin({ variables: {id: project.id, estado: "Inactivo"}})}>Inactivar</Button>
                                                                }
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            {rol === "Estudiante" &&
                                <Row>
                                    <Col md={{ span: 4, offset: 4 }}>
                                        <div className="edit_button justify-content-center">
                                            <Button className="botonsito" variant="primary" href="/inscripciones/estudiante">Ver Inscripciones</Button>
                                        </div>
                                    </Col>
                                </Row>
                            }
                        </Container>
                    </Card.Body>
                </Card>}
        </>
    )
}

export default ListarProyectos;