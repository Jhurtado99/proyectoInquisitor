import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../Hooks/useAuth';


const PrivateRouter = ({ component: Component, ...rest }) => {

const auth = useAuth();

    return (
        <Route  {...rest}>
            {auth.isLogged() ?
                <Component />
                : <Redirect to="/login" />
            }
        </Route>
    )
}

export default PrivateRouter;