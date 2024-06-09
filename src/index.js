import { startServer } from './src/server.js';
import { initMongoDb } from './src/db/initMongoConnection.js';
import './server.js';

const bootstrap = async() => {
    await initMongoDb();
    startServer();
};
bootstrap();

