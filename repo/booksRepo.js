/* eslint-disable no-undef */
/* eslint-disable no-async-promise-executor */

const { MongoClient, ObjectId } = require("mongodb");


const dbUrl = process.env.CONN_STR;
const dbName = process.env.DB_NAME;
const booksTableName = "books";

function booksRepo() {

    async function getAll(query) {
        return new Promise(async (resolve, rejects) => {
            const client = new MongoClient(dbUrl);
            try {
                await client.connect();
                const db = client.db(dbName)
                const result = db.collection(booksTableName).find(query);
                resolve(await result.toArray());
                await client.close();
            } catch (error) {
                rejects(error);
            }
        })
    }

    async function getById(id) {
        return new Promise(async (resolve, rejects) => {
            const client = new MongoClient(dbUrl);
            try {
                await client.connect();
                const db = client.db(dbName)
                const result = await db.collection(booksTableName).findOne(ObjectId(id));
                resolve(result);
                await client.close();
            } catch (error) {
                rejects(error);
            }
        })
    }

    async function add(book) {
        return new Promise(async (resolve, rejects) => {
            const client = new MongoClient(dbUrl);
            try {
                await client.connect();
                const db = client.db(dbName)
                const result = db.collection(booksTableName).insertOne(book);
                resolve((await result).insertedId);
                await client.close();
            } catch (error) {
                rejects(error);
            }
        })
    }

    async function update(id, book) {
        return new Promise(async (resolve, rejects) => {
            const client = new MongoClient(dbUrl);
            try {
                await client.connect();
                const db = client.db(dbName)
                const result = await db.collection(booksTableName).findOneAndReplace({ _id: id }, book);
                resolve(result.ok);
                await client.close();
            } catch (error) {
                rejects(error);
            }
        })
    }

    async function remove(id) {
        return new Promise(async (resolve, rejects) => {
            const client = new MongoClient(dbUrl);
            try {
                await client.connect();
                const db = client.db(dbName)
                const result = await db.collection(booksTableName).deleteOne({ _id: ObjectId(id) });
                resolve(result.deletedCount);
                await client.close();
            } catch (error) {
                rejects(error);
            }
        })
    }

    return { getAll, getById, add, update, remove };
}

module.exports = booksRepo();