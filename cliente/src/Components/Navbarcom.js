import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import logo from '../Images/Inquisitor2.png';
import './Components.css';
import useAuth from "../Hooks/useAuth";


const Navbarcom = () => {

    const auth = useAuth();

    const rol = auth.user.rol;

    return (

        <Navbar variant="dark" expand="md" id="navbar">
            <Container>
                <Navbar.Brand href="/home">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Inquisitor</Navbar.Brand>
                <Nav id="options">
                    <Nav.Item>
                        <Nav.Link href="/home">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/perfil">Perfil</Nav.Link>
                    </Nav.Item>
                    {rol === "Lider"
                        ? (<Nav.Item>
                            <Nav.Link href="/listarProyectos">Proyectos</Nav.Link>
                        </Nav.Item>)
                        : (<Nav.Item>
                            <Nav.Link href="/listar-proyectos">Proyectos</Nav.Link>
                        </Nav.Item>)
                    }
                    {rol === "Estudiante"
                        ? (<Nav.Item>
                            <Nav.Link href="/inscripciones/estudiante">Inscripciones</Nav.Link>
                        </Nav.Item>)
                        : (<Nav.Item>
                            <Nav.Link href="/usuarios">Usuarios</Nav.Link>
                        </Nav.Item>)
                    }
                    <Button id="logout" variant="info" size="sm" onClick={auth.logout}>Cerrar Sesión</Button>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navbarcom;