// env
import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';

// Bases de datos
import { mongoConnection } from '../db/mongodb';

// Routes
import userRoutes from '../components/usuarios/usuarios.routes';
import loginRoutes from '../components/login/login.routes';
import roleRoutes from '../components/roles/roles.routes';
import clinicaRoutes from '../components/clinica/clinica.routes';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {

        usuarios: '/api/v1/usuarios',
        login: '/api/v1/login',
        role: '/api/v1/role',
        clinica: '/api/v1/clinica',

    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // DB's SQL, Mongo
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Definir las rutas
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use(express.json());

        // Carpeta publica
        this.app.use( express.static('public') );

    }

    async dbConnection() {

        try {

            // MongoDB
            mongoConnection();
            
        } catch ( error ) {
            console.log( error );
        }
    }

    routes() {

        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.login, loginRoutes);
        this.app.use(this.apiPaths.role, roleRoutes);
        this.app.use(this.apiPaths.clinica, clinicaRoutes);
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en el PUERTO: ${ this.port }`);
        });
    }

}

export default Server;

