import express from "express";
import dotenv from 'dotenv';
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";
import dbConnection from "./database/config";
import { validarJwt } from "./middleware/validar-jwt";
import cors from "cors";

dotenv.config();

const app = express();

dbConnection();

app.use(cors());

app.use(validarJwt);

app.use("/graphql", graphqlHTTP((req, res) => ({

    graphiql: true,
    schema: schema,
    context: {
        user: req.user,
        rol: req.rol,
        est: req.est,
        uid: req.uid,
        name: req.name
    }
})));

app.listen(process.env.PORT, () => {
    console.log('Servidor conectado al puerto');
});
