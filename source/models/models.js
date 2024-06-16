import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

const user = process.env.USERNAME;
const password = process.env.PASSWORD;
const cluster_url = process.env.CLUSTER_URL;
const url = `mongodb+srv://dbspeedytweety675:${password}@${cluster_url}.nstt6sc.mongodb.net/?retryWrites=true&w=majority&appName=${cluster_url}`;
console.log(url);
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
let dbName = "Spring2024NodeJS";
let collectionName = "people";

async function connectToDatabase() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to MongoDB testing 1");
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

async function getPeople() {
    try {
        connectToDatabase();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const peopleCursor = await collection.find();
        return await peopleCursor.toArray();
    } finally {
        await client.close();
        console.log("connection closed testing 1");
    } 
}

async function createPerson(person) {
    try {
        await connectToDatabase();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.insertOne(person);
        console.log(`New listing created with the following id: ${result.insertedId}`);
        return result;
    } catch (err) {
        console.error('Error creating person:', err);
    }
}

async function updatePerson(filter, update) {
    try {
        await connectToDatabase();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.updateOne(filter, { $set: update });
        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) updated.`);
        return result;
    } catch (err) {
        console.error('Error updating person:', err);
    }
}

export {
    getPeople,
    createPerson,
    updatePerson
};