import React, { useState, useRef, useEffect } from "react";
import { Form, Container, Button, Card, Row, Col, Image, Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import logo from '../../Images/Logo_Inquisitor2.png';
import '../Pages.css';
import SET_USUARIO from '../../Apollo/gql/setUsuario';
import { useMutation } from "@apollo/client";

const Register = () => {

    const passwordConEl = useRef("");

    const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const history = useHistory();

    const handleLogin = (event) => {
        event.preventDefault();
        history.push('/login');
    }

    const [createUsuario, { data }] = useMutation(SET_USUARIO);

    useEffect(()=> {
        if (data) {
            console.log(data);
            history.replace('/login');
        }
    }, [data, history])

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [nombre, setNombre] = useState(""); 
    const [dni, setDni] = useState(""); 
    const [rol, setRol] = useState(""); 

    const handlePasswordVer = (event) => {
        const passCon = passwordConEl.current.value;
        if (passCon !== password) {
            setShow(true);
            setDisabled(true);
        } else {
            setShow(false);
            setDisabled(false);
        }
    }

    function handleInputChange(event) {
        if (event.target.name === "email") {
            setEmail(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        } else if (event.target.name === "nombre") {
            setNombre(event.target.value);
        } else if (event.target.name === "dni") {
            setDni(event.target.value);
        } else if (event.target.name === "rol") {
            setRol(event.target.value);
        } 
    }

    const submitHandler = (event) => {
        event.preventDefault();

        createUsuario({ variables: { email, dni, nombre, password, rol } });
        
    }

    return (
        <div className="card_container">
            <Container className="form-container">
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <div className="register_imagen">
                            <Image src={logo} rounded />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Card style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title className="text-center">Registro</Card.Title>
                                <Form onSubmit={submitHandler}>

                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text" placeholder="Nombre" name="nombre" onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Correo elecrónico</Form.Label>
                                        <Form.Control type="email" placeholder="Correo electrónico" name="email" onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicID">
                                        <Form.Label>Identificación</Form.Label>
                                        <Form.Control type="text" placeholder="Identificación" name="dni" onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicSelection">
                                        <Form.Label>Rol</Form.Label>
                                        <Form.Select defaultValue="Seleccione..." name="rol" onChange={handleInputChange} >
                                            <option>Seleccione...</option>
                                            <option value="Administrador">Administrador</option>
                                            <option value="Lider">Lider</option>
                                            <option value="Estudiante">Estudiante</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control type="password" placeholder="Contraseña" name="password" onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control type="password" placeholder="Confirmar Contraseña" ref={passwordConEl} onChange={handlePasswordVer} />
                                    </Form.Group>

                                    <Alert id="alerta" variant="danger" show={show}>Las contraseñas no coinciden</Alert>

                                    <div className="buttons">
                                        <div className="register_button">
                                            <Button variant="primary" type="submit" disabled={disabled}>Regístrate</Button>
                                        </div>
                                        <div className="register_button">
                                            <Button variant="info" onClick={handleLogin}>Iniciar Sesión</Button>
                                        </div>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default Register;