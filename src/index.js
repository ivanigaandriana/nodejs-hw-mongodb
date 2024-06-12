import { initMongoDb } from './db/initMongoConnection.js';
import { startServer } from './server.js';

const bootstrap = async () => {
    try {
        await initMongoDb();
        startServer();
    } catch (error) {
        console.error('Failed to start the application', error);
    }
};

bootstrap();

