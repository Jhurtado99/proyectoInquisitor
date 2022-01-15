import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from '../Pages/Auth/Login';
import ContentRouter from './ContentRouter';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import Register from '../Pages/Auth/Register';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRouter exact path="/" component={ Login } />
                    <PublicRouter path="/login" component={ Login } />
                    <PublicRouter path="/register" component={ Register } />
                    <PrivateRouter path="/*" component={ ContentRouter } />  
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter;