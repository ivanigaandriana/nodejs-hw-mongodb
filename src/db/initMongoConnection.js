import mongoose from 'mongoose';
import { env } from '../utils/evn.js';
export const initMongoDb = async () => {
    try{
        const user = env('MONGODB_USER');
        const password = env('MONGODB_PASSWORD');
        const url = env('MONGODB_URL');
        const dbName = env('MONGODB_DB');
    await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${dbName}?retryWrites=true&w=majority`,);
    console.log('MongoDb connection successfully established!');
    }catch(error){
        console.log("Error while setting up mongo connection",error);
        throw error;
    }

};
