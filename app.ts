import dotenv from 'dotenv';
import Server from './classes/server';

dotenv.config();

const server = new Server();

server.listen();
