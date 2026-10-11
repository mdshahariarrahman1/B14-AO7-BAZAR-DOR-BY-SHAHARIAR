
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;

if (!uri) {
  throw new Error("MONGODB_URL is missing");
}

export const client = new MongoClient(uri);
export const db = client.db("bazar-dor");
