// import  dotenv from'dotenv';
// dotenv.config();
import{setupServer} from "./server.js";
import {initMongoDb} from "./db/initMongoConnection.js";

const startServer = async () => {
    try {
        await initMongoDb();
        setupServer();
    } catch (error) {
        console.error('Failed to start the server:', error.message);
    }
};
startServer();
