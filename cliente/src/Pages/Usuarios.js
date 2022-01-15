import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Container, Button, Card, Table } from 'react-bootstrap';
import './Pages.css';
import GET_USUARIOS from '../Apollo/gql/getUsuarios';
import useAuth from "../Hooks/useAuth";
import UPDATE_USUARIO_ESTADO from "../Apollo/gql/updateUsuarioByEdo";


const Usuarios = () => {

    const auth = useAuth();

    const rol = auth.user.rol;

    const { data, loading, error } = useQuery(GET_USUARIOS, {
        fetchPolicy: "network-only"
    });

    const [updateUsuarioByEdo] = useMutation(UPDATE_USUARIO_ESTADO, {
        refetchQueries: [{ query: GET_USUARIOS }]
    });

    return (
        <>
            {loading && <p>Cargando ...</p>}
            {error && <p>Se ha producido un error</p>}
            {
                data &&
                <Card style={{ width: '60vw' }} id="card" text="light">
                    <Card.Header as="h4" className="text-center">Usuarios</Card.Header>
                    <Card.Body>
                        <Container>
                            <Table bordered hover className="table">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Identificación</th>
                                        <th>Correo</th>
                                        {rol !== "Lider" && <th>Rol</th>}
                                        <th>Estado</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.Usuarios.map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{user.nombreUsuario}</td>
                                                <td>{user.dniUsuario}</td>
                                                <td>{user.correoUsuario}</td>
                                                {rol !== "Lider" && <td>{user.rolUsuario}</td>}
                                                <td>{user.estUsuario}</td>
                                                <td>
                                                    <div>
                                                        {(rol === "Administrador" && user.estUsuario === "Pendiente")
                                                            && <Button variant="warning" className="usuarios" size="sm" onClick={() => updateUsuarioByEdo({ variables: { id: user.id, estado: "No Autorizado" } })}>No Autorizar</Button>} {' '}
                                                        {(rol === "Administrador" && user.estUsuario === "No Autorizado")
                                                            ? <Button variant="success" className="usuarios" size="sm" onClick={() => updateUsuarioByEdo({ variables: { id: user.id, estado: "Autorizado" } })}>Autorizar</Button>
                                                            : (rol === "Administrador" && user.estUsuario === "Autorizado")
                                                                ? <Button variant="warning" className="usuarios" size="sm" onClick={() => updateUsuarioByEdo({ variables: { id: user.id, estado: "No Autorizado" } })}>No Autorizar</Button>
                                                                : (user.estUsuario === "Pendiente")
                                                                    ? <Button variant="success" className="usuarios" size="sm" onClick={() => updateUsuarioByEdo({ variables: { id: user.id, estado: "Autorizado" } })}>Autorizar</Button>
                                                                    : <Button variant="outline-primary" size="sm" disabled>{user.estUsuario}</Button>}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Container>
                    </Card.Body>
                </Card>
            }
        </>
    )

}

export default Usuarios;