import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../Hooks/useAuth';


const PublicRouter = ({ component: Component, ...rest }) => {

const auth = useAuth();

    return (
        <Route  {...rest}>
            {!auth.isLogged() ?
                <Component />
                : <Redirect to="/home" />
            }
        </Route>
    )
}

export default PublicRouter;