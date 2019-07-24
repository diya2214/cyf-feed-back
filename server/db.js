import { MongoClient } from "mongodb";
const backendEnv = `${process.cwd()}/server/.env`;
require('dotenv').config()
const dbUrl = process.env.DATABASE_URI;
console.log(dbUrl);

const configuration = { useNewUrlParser: true };

export const getClient = () => new MongoClient(dbUrl, configuration);
