import React, { useEffect, useState } from "react";
import { Form, Container, Button, Card, Row, Col, Image, Alert } from 'react-bootstrap';
import logo from '../../Images/Logo_Inquisitor2.png';
import '../Pages.css';
import useAuth from '../../Hooks/useAuth';
import LOGIN_USUARIO from '../../Apollo/gql/loginUsuario';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from "@apollo/client";


const Login = () => {

    const auth = useAuth();

    const history = useHistory();

    const [loginUsuario, { data }] = useLazyQuery(LOGIN_USUARIO);

    const [show, setShow] = useState(false);
    

    useEffect(() => {

        if (data) {

            if (data.Login.token == null) {
                setShow(true)
            } else {
                auth.setToken(data.Login.token);
                auth.setUser({ id: data.Login.id, nombre: data.Login.nombreUsuario, rol: data.Login.rolUsuario });

                history.replace('/home')
            }            
        }
    }, [data, history, auth]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleInputChange(event) {
        if (event.target.name === "email") {
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    function handleLogin(event) {
        event.preventDefault();

        loginUsuario({ variables: { email, password } })

    }

    return (
        <div className="card_container">
            <Container className="form-container">
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <div className="imagen">
                            <Image src={logo} rounded />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Card style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title className="text-center">Inicio de Sesión</Card.Title>
                                <Form onSubmit={handleLogin}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Correo elecrónico</Form.Label>
                                        <Form.Control type="email" placeholder="Correo electrónico" name="email" onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control type="password" placeholder="Contraseña" name="password" onChange={handleInputChange} />
                                    </Form.Group>

                                    <div className="buttons">
                                        <div className="login_button">
                                            <Button variant="primary" type="submit">Entrar</Button>
                                        </div>
                                        <div className="register_button">
                                            <Button variant="info" href="/register">Registrarse</Button>
                                        </div>
                                    </div>
                                </Form>
                                <Alert id="alerta" variant="danger" show={show}>Usuario o contraseña incorrectos</Alert>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default Login;