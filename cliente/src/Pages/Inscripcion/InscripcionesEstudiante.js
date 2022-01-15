import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import GET_PROYECTOS_EST from "../../Apollo/gql/getProyectosEst";
import UPDATE_INSCRIPCION_EST from "../../Apollo/gql/updateInscripcionEst";
import useAuth from "../../Hooks/useAuth";
import '../Pages.css';
import Cargando from "../Utiles/Cargando";
import Error from "../Utiles/Error";

const InscripcionesEstudiante = () => {

    const auth = useAuth();

    const user_id = auth.user.id;
    const rol = auth.user.rol;

    const { data, loading, error } = useQuery(GET_PROYECTOS_EST, {
        fetchPolicy: "network-only"
    });

    if (data) {
        console.log(data);
    }

    const [updateInscripcion] = useMutation(UPDATE_INSCRIPCION_EST, {
        refetchQueries: [{ query: GET_PROYECTOS_EST }]
    });

    const condicion = (inscripcion) => {
        return inscripcion._idUsuario === user_id;
    }

    return (
        <>
            {loading && <Cargando />}
            {error && <Error />}
            {
                data &&
                <Container>
                    <Row>
                        <Col>
                            <Table striped bordered hover className="table">
                                <thead>
                                    <tr>
                                        <th>Proyecto</th>
                                        <th>Fase</th>
                                        <th>Obj. Generales</th>
                                        <th>Obj. Específicos</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.getProyectosEst.map((project, index) => (
                                            <tr key={project.id}>
                                                <td>{project.nombreProyecto}</td>
                                                <td>{project.faseProyecto}</td>
                                                <td>{project.objGenerales}</td>
                                                <td>{project.objEspecificos}</td>
                                                <td>
                                                    {(rol === "Estudiante" && project.inscripciones.find(condicion))
                                                        ? <Button variant="outline-primary" size="sm" disabled>Ya está inscrito</Button>
                                                        : <Button variant="primary" onClick={() => updateInscripcion({ variables: { id: project.id, nombre: project.nombreProyecto } })}>Inscribirse</Button>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <div className="edit_button justify-content-center">
                                <Button className="botonsito2" variant="primary" href="/listar-proyectos">Ir a Proyectos</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>}
        </>
    )

}

export default InscripcionesEstudiante;