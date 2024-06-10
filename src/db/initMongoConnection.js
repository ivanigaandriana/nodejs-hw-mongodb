import mongoose from 'mongoose';
import { env } from '../utils/evn.js';
import { MONGO_VARS } from '../constans/index.js';
export const initMongoDb = async () => {
    try{
        const user = env(MONGO_VARS.MONGODB_USER);
        const password = env(MONGO_VARS.MONGODB_PASSWORD);
        const url = env(MONGO_VARS.MONGODB_URL);
        const dbName = env(MONGO_VARS.MONGODB_DB, '');
    await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${dbName}?retryWrites=true&w=majority`,);
    console.log('Connected to MongoDB');
    }catch(error){
        console.log(error);
        process.exit(1);
        throw error;
    }

};
