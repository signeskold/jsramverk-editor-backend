const { ObjectId } = require("bson");
const database = require("../db/database.js");

const documents = {
    init: async function (res) {
        let db;

        try {
            db = await database.getDb();

            await db.collection.deleteMany({});
            const result = await db.collection.insertMany(initDocs);

            return result;
        } catch (error) {
            return {
                errors: {
                    message: error.message
                }
            };
        } finally {
            await db.client.close();
        }
    },
    readAll: async function (res) {
        let db;

        try {
            db = await database.getDb();
            const allDocuments = await db.collection.find().toArray();
            console.log("allDocuments: ", allDocuments);
            return res.status(200).json({
                data: { msg: allDocuments }
            });
        } catch (err) {
            return res.status(500).json({
                error: {
                    status: 500,
                    path: "/docs",
                    title: "Database error",
                    message: err.message
                }
            });
        } finally {
            await db.client.close();
        }
    },
    read: async function(res, id) {
        let db;

        try {
            db = await database.getDb();
            let query = { "_id": ObjectId(id) };
            let result = await db.collection.findOne(query);

            return res.status(200).json({
                data: result
            });
        } catch (err) {
            return res.status(500).json({
                error: {
                    status: 500,
                    path: "/docs/:id",
                    title: "Database error",
                    message: err.message
                }
            });
        } finally {
            await db.client.close();
        }
    },
    create: async function(res, title, text) {
        let db;
        try {
            db = await database.getDb();
            let item = { "_id": ObjectId(), "title": title, "text": text };

            await db.collection.insertOne(item);

            return res.status(200).json({
                data: item
            });
        } catch (err) {
            return res.status(500).json({
                error: {
                    status: 500,
                    path: "/docs/create",
                    title: "Database error",
                    message: err.message
                }
            });
        } finally {
            await db.client.close();
        }
    },
    update: async function(res, id, title, text) {
        let db;

        try {
            db = await database.getDb();
            let query = { "_id": ObjectId(id) };
            let updatedDoc = { "title": title, "text": text };
            const options = { upsert: true };

            await db.collection.replaceOne(query, updatedDoc, options);

            return res.status(200).json({
                data: "Document updated."
            });
        } catch (err) {
            return res.status(500).json({
                error: {
                    status: 500,
                    path: "/docs/update",
                    title: "Database error",
                    message: err.message
                }
            });
        } finally {
            await db.client.close();
        }
    }
};

module.exports = documents;
