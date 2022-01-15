import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Modal } from 'react-bootstrap';
import useAuth from "../../Hooks/useAuth";
import EditarProyecto from "./EditarProyecto";
import GET_PROYECTOS from "../../Apollo/gql/getProyectos";
import { useQuery } from "@apollo/client";
import Cargando from "../Utiles/Cargando";
import Error from "../Utiles/Error";
import VerAvances from "./VerAvances";
import CrearAvance from "./CrearAvance";


const VerProyecto = ({ proyectid }) => {

    const auth = useAuth();

    const rol = auth.user.rol;
    const user_id = auth.user.id;

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    
    const [proyectito, setProyectito] = useState([]);
    const [editProyect, setEditProyect] = useState(null);


    const { data, loading, error } = useQuery(GET_PROYECTOS, {
        variables: { id: proyectid },
        fetchPolicy: "network-only"
    });

    useEffect(() => {
        if (data) {
            setProyectito([data.getProyectos]);
            setEditProyect(data.getProyectos);
        }
    }, [data])

    const condicion1 = (inscripciones) => {
        return inscripciones.estinscripcion === "Aceptada";
    }

    const condicion2 = (inscripciones) => {
        return inscripciones._idUsuario === user_id;
    }

    return (
        <>
            {loading && <Cargando />}
            {error && <Error />}
            {
                data &&
                <>
                    <Container>
                        <Row>
                            <Col>
                                <Table striped bordered hover className="table">
                                    <thead>
                                        <tr>
                                            <th>Proyecto</th>
                                            <th>Presupuesto</th>
                                            <th>Fase</th>
                                            <th>Obj. Generales</th>
                                            <th>Obj. Específicos</th>
                                            <th>Avances</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            proyectito.map((project, index) => (
                                                <tr key={project.id}>
                                                    <td>{project.nombreProyecto}</td>
                                                    <td>{project.presupuesto}</td>
                                                    <td>{project.faseProyecto}</td>
                                                    <td>{project.objGenerales}</td>
                                                    <td>{project.objEspecificos}</td>
                                                    <td>{(project.inscripciones.find(condicion1) && project.inscripciones.find(condicion2))
                                                            ? <Button variant="info" onClick={handleShow2} size="sm">Ver Avances</Button>
                                                            : (rol === "Lider") 
                                                                ? <Button variant="info" onClick={handleShow2} size="sm">Ver Avances</Button>
                                                                : <Button variant="outline-primary" size="sm" disabled>Sin acceso</Button>
                                                        }
                                                    </td>
                                                    <td>
                                                        {(project.inscripciones.find(condicion1) && project.inscripciones.find(condicion2))
                                                            ? <Button variant="primary" size="sm" onClick={handleShow3}>Registrar Avance</Button>
                                                            : (rol === "Lider") 
                                                                ? <Button variant="primary" onClick={handleShow}>Editar</Button>
                                                                : <Button variant="outline-primary" size="sm" disabled>No hay opciones</Button>
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
                                    {(rol === "Estudiante")
                                        ? <Button className="botonsito2" variant="primary" href="/listar-proyectos">Volver a Proyectos</Button>
                                        : (rol === "Lider") && <Button className="botonsito2" variant="primary" href="/listarProyectos">Volver a Proyectos</Button>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    <Modal show={show} onHide={handleClose} size='xl' centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><EditarProyecto project={editProyect} /></Modal.Body>
                    </Modal>

                    <Modal show={show3} onHide={handleClose3} size='xl' centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Registrar Avances</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><CrearAvance project={editProyect} /></Modal.Body>
                    </Modal>

                    <Modal show={show2} onHide={handleClose2} size='xl' centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Avances del Proyecto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><VerAvances project={editProyect} /></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose2}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>}
        </>
    )

}

export default VerProyecto;