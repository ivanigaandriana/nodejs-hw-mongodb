import mongoose from "mongoose";
import {evn} from "../utils/evn.js";
import { MONGO_VARS } from "../constans/index.js";


export const initMongoDb = async () => {
    try{
        const user = evn(MONGO_VARS .MONGODB_USER);
    const password = evn(MONGO_VARS .MONGODB_PASSWORD);
    const url = evn(MONGO_VARS .MONGODB_URL);
    const dbName = evn(MONGO_VARS .MONGODB_DB, '');
   await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${dbName}?retryWrites=true&w=majority`,);

   console.log('Mongodb connected');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        process.exit(1);
        throw error;
  }
};
