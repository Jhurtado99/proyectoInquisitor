import React, { useEffect, useRef, useState } from "react";
import { Form, Container, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import useAuth from "../Hooks/useAuth";
import GET_USUARIO_BY_ID from '../Apollo/gql/getUsuarioById';
import UPDATE_USUARIO from "../Apollo/gql/updateUsuario";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Cargando from "./Utiles/Cargando";
import Error from "./Utiles/Error";


const Perfil = () => {

    const auth = useAuth();

    const user_id = auth.user.id;

    const history = useHistory();

    const passwordConEl = useRef("");
    const passwordEl = useRef("");

    const { data, loading, error } = useQuery(GET_USUARIO_BY_ID, {
        variables: { id: user_id },
    });

    const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const [email, setEmail] = useState("");;
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [rol, setRol] = useState("");

    const handlePasswordVer = (event) => {
        const passCon = passwordConEl.current.value;
        const pass = passwordEl.current.value;
        if (passCon !== pass) {
            setShow(true);
            setDisabled(true);
        } else {
            setShow(false);
            setDisabled(false);
        }
    }

    const [updateUsuario] = useMutation(UPDATE_USUARIO);

    useEffect(() => {
        if (data) {
            setEmail(data.getUsuarios.correoUsuario);
            setNombre(data.getUsuarios.nombreUsuario);
            setDni(data.getUsuarios.dniUsuario);
            setRol(data.getUsuarios.rolUsuario);
        }

    }, [data])

    const handleEdit = (event) => {
        event.preventDefault();

        updateUsuario({ variables: { id: user_id, email: email, dni: dni, nombre: nombre, password: password, rol: rol } })
            .then(setTimeout(() => history.push('/home'), 1000))
            .catch(function (e) {
                console.log(e);
            });

    }

    return (
        <>
            {loading && <Cargando />}
            {error && <Error />}
            {
                data &&
                <Card style={{ width: '60vw' }} id="card-perfil" text="light">
                    <Card.Header as="h4" className="text-center">Perfil</Card.Header>
                    <Card.Body>
                        <Container>
                            <Form onSubmit={handleEdit}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Correo elecrónico</Form.Label>
                                            <Form.Control type="email" defaultValue={data.getUsuarios.correoUsuario} onChange={(event) => setEmail(event.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control type="text" defaultValue={data.getUsuarios.nombreUsuario} onChange={(event) => setNombre(event.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicID">
                                            <Form.Label>Identificación</Form.Label>
                                            <Form.Control type="text" defaultValue={data.getUsuarios.dniUsuario} onChange={(event) => setDni(event.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicSelection">
                                            <Form.Label>Rol</Form.Label>
                                            <Form.Select defaultValue={data.getUsuarios.rolUsuario} disabled>
                                                <option>Seleccione...</option>
                                                <option value="Administrador">Administrador</option>
                                                <option value="Lider">Lider</option>
                                                <option value="Estudiante">Estudiante</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control type="password" placeholder="Contraseña" ref={passwordEl} onChange={(event) => setPassword(event.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicPassword2" >
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control type="password" placeholder="Confirmar Contraseña" ref={passwordConEl} onChange={handlePasswordVer} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ span: 8, offset: 3 }}>
                                        <Form.Text className="text-muted">Por favor introduce tu contraseña actual o una nueva antes de guardar los cambios.</Form.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ span: 8, offset: 2 }}>
                                        <Alert id="alerta" variant="danger" show={show}>Las contraseñas no coinciden</Alert>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ span: 6, offset: 3 }}>
                                        <div className="edit_button justify-content-center">
                                            <Button className="edit" variant="primary" type="submit" disabled={disabled}>Editar</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Card.Body>
                </Card>
            }
        </>
    )

}

export default Perfil;