const { MongoClient } = require("mongodb");
require("dotenv").config();

let db;

const connectToDb = async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db("contactsDB");
  console.log("Connected to MongoDB");
};

const getDb = () => db;

module.exports = { connectToDb, getDb };
