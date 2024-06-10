import { startServer } from './server.js';
import { initMongoDb } from './db/initMongoConnection.js';


// const bootstrap = async() => {
//     await initMongoDb();
//     startServer();
// };
// bootstrap();

(async () => {
    await initMongoDb();
    startServer();});
