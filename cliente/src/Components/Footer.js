import React from "react";
import './Components.css';
import logo from '../Images/Logo_Inquisitor3.png';
import useAuth from '../Hooks/useAuth';

const Footer = () => {
    
    const auth = useAuth();
    
    const rol = auth.user.rol;
    const nombre = auth.user.nombre;

    return (
        <footer id="footer" className="page-footer font-small pt-2" >
            <div className="container-fluid text-center text-md-left">
                <div className="row" id="content">
                    <div className="col-md-1" id="usuario">
                        <div>{nombre}</div>
                        {rol === "Estudiante" ? <div>Estudiante</div> : (rol === "Lider") ? <div>Líder</div> : <div>Administrador</div>}
                    </div>
                    <div className="col-md-10">
                        <div id="footer-rights">© 2021 MongoDevs. All rights reserved.</div>
                    </div>
                    <div className="col-md-1" id="logo">
                        <img
                            alt=""
                            src={logo}
                            width="150"
                            height="100"
                            className="d-inline-block align-top"
                        />
                    </div>
                </div>
            </div>
        </footer >
    );
}

export default Footer;