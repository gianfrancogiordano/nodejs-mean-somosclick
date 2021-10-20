"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// env
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Bases de datos
const mongodb_1 = require("../db/mongodb");
// Routes
const usuarios_routes_1 = __importDefault(require("../components/usuarios/usuarios.routes"));
const login_routes_1 = __importDefault(require("../components/login/login.routes"));
const roles_routes_1 = __importDefault(require("../components/roles/roles.routes"));
const clinica_routes_1 = __importDefault(require("../components/clinica/clinica.routes"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/v1/usuarios',
            login: '/api/v1/login',
            role: '/api/v1/role',
            clinica: '/api/v1/clinica',
        };
        this.app = express_1.default();
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
        this.app.use(cors_1.default());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // MongoDB
                mongodb_1.mongoConnection();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_routes_1.default);
        this.app.use(this.apiPaths.login, login_routes_1.default);
        this.app.use(this.apiPaths.role, roles_routes_1.default);
        this.app.use(this.apiPaths.clinica, clinica_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el PUERTO: ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map