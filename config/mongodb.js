const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = "tourgasm";

const mongoConnect = async () => {
    return new Promise( async (resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if(err) reject(err);
            let dbo = db.db(dbName);
            resolve(dbo);
        });
    });
}

module.exports = {
    mongoConnect
}