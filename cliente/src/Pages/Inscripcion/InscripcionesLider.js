import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import '../Pages.css';
import useAuth from "../../Hooks/useAuth";
import Cargando from "../Utiles/Cargando";
import Error from "../Utiles/Error";
import { useMutation, useQuery } from "@apollo/client";
import GET_PROYECTOS_LIDER from "../../Apollo/gql/getProyectosByLider";
import UPDATE_EST_INSCRIPCION from "../../Apollo/gql/updateEstInscripcion";


const InscripcionesLider = () => {

    const auth = useAuth();

    const user_id = auth.user.id;

    const {data, loading, error} = useQuery(GET_PROYECTOS_LIDER, {
        variables: { id: user_id },
        fetchPolicy: "network-only"
    });

    const [updateInscripcion] = useMutation(UPDATE_EST_INSCRIPCION);

    const [Inscripciones, setInscripciones] = useState([]);

    useEffect(() => {
        if (data) {

            data.getProyectosByLider.forEach((item) => {
                item.inscripciones.forEach((inscrip) => {
                    if (inscrip.estinscripcion === "Pendiente") {
                        setInscripciones(currentInscripciones => currentInscripciones.concat(inscrip));
                    }
                });
            });
        }
    
    }, [data])

    const handleAceptar = (inscripcion) => {

        updateInscripcion({ variables: { id: inscripcion._idProyecto, idinscripcion: inscripcion.id, estado: "Aceptada" } })
        .then(setTimeout(() => window.location.reload(), 1000))

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
                                        <th>Estudiante</th>
                                        <th>Fecha Ingreso</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Inscripciones.map((inscripcion, index) => (
                                        <tr key={inscripcion.id}>
                                            <td>{inscripcion.nombreProyecto}</td>
                                            <td>{inscripcion.nombreUsuario}</td>
                                            <td>{inscripcion.fechaIngreso}</td>
                                            <td><Button variant="primary" onClick={() => handleAceptar(inscripcion)}>Aceptar</Button></td>
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
                                <Button className="botonsito2" variant="primary" href="/listarProyectos">Ir a Proyectos</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>}
        </>
    )

}

export default InscripcionesLider;