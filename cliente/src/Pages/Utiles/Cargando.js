import React from 'react';
import { Card } from 'react-bootstrap';
import '../Pages.css';

const Cargando = () => {

  return (
    <Card style={{ width: '30vw' }} id="card-home" text="light">
      <Card.Body id="cargando">
          <h1>Cargando...</h1>
      </Card.Body>
    </Card>
  );
}

export default Cargando;