import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import perfil from '../../Images/Perfil.png';
import usuarios from '../../Images/Usuarios.png';
import proyectos from '../../Images/Proyectos.png';
import ayuda from '../../Images/Ayuda.png';
import inscripciones from '../../Images/Inscripciones.png';
import '../Pages.css';
import { useHistory } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Home = () => {

  const history = useHistory();

  const auth = useAuth();

  const rol = auth.user.rol;

  const handleProyectos = () => {
    if (rol === "Lider") {
      history.push('/listarProyectos')
    } else {
      history.push('/listar-proyectos')
    }
  }


  return (
    <Card style={{ width: '45vw' }} id="card-home" text="light">
      <Card.Header as="h4" className="text-center">Home</Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col md="6">
              <Container id="cuadritos" onClick={() => history.push('/perfil')}>
                <p>Perfil</p>
                <img
                  alt=""
                  src={perfil}
                  width="60"
                  height="60"
                  className="d-inline-block align-top"
                />
              </Container>
            </Col>
            <Col md="6">
              <Container id="cuadritos" onClick={handleProyectos}>
                <p>Proyectos</p>
                <img
                  alt=""
                  src={proyectos}
                  width="60"
                  height="60"
                  className="d-inline-block align-top"
                />
              </Container>
            </Col>
          </Row>
          <Row>
            {rol !== "Estudiante"
              ? (<Col md="6">
                <Container id="cuadritos" onClick={() => history.push('/usuarios')}>
                  <p>Usuarios</p>
                  <img
                    alt=""
                    src={usuarios}
                    width="60"
                    height="60"
                    className="d-inline-block align-top"
                  />
                </Container>
              </Col>)
              : (<Col md="6">
                <Container id="cuadritos" onClick={() => history.push('/inscripciones/estudiante')}>
                  <p>Inscripciones</p>
                  <img
                    alt=""
                    src={inscripciones}
                    width="60"
                    height="60"
                    className="d-inline-block align-top"
                  />
                </Container>
              </Col>)}
              <Col md="6">
                <Container id="cuadritos">
                  <p>Ayuda</p>
                  <img
                    alt=""
                    src={ayuda}
                    width="60"
                    height="60"
                    className="d-inline-block align-top"
                  />
                </Container>
              </Col> 
        </Row>
      </Container>
    </Card.Body>
    </Card >
  );
}

export default Home;