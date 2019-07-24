import { MongoClient } from "mongodb";

const dbUrl = "mongodb://localhost:27017/CYFFeedbackDB";
const configuration = { useNewUrlParser: true };

export const getClient = () => new MongoClient(dbUrl, configuration);
