/**
 * Connect to the database and setup it with some default data.
 */
"use strict";

let databj;
let config;

try {
    config = require("../../config.json");
} catch (err) {
    console.log(err);
}
try {
    databj = require("../database.json");
} catch (err) {
    console.log(err);
}

const username = process.env.SECRET_USERNAME || config.username;
const password = process.env.SECRET_PASSWORD || config.password;

const mongo = require("mongodb").MongoClient;
const dsn = `mongodb+srv://${username}:${password}@cluster0.lzb1l.mongodb.net/`+
    `${databj.database}?retryWrites=true&w=majority`;
//const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/signeeditor";

const fs = require("fs");
const path = require("path");
const docs = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, "setup.json"),
    "utf8"
));
console.log("docs: ", docs);

// Do it.
resetCollection(dsn, databj.collection, docs)
    .catch(err => console.log(err));

/**
 * Reset a collection by removing existing contents and insert a default
 * set of documents.
 *
 * @async
 *
 * @param {string} dsn     DSN to connect to database.
 * @param {string} colName Name of collection.
 * @param {string} doc     Documents to be inserted into collection.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<void>} Void
 */
async function resetCollection(dsn, colName, doc) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);

    await col.deleteMany();
    await col.insertMany(doc);

    await client.close();
}
