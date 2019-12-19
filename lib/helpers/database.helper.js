( (databaseHelper) => {
    'use strict';
    const Promise = require('bluebird');
    const dbConfig = require('../configs/database.config');
    const mongodb = Promise.promisifyAll(require('mongodb'));
    const MongoClient = mongodb.MongoClient;


    databaseHelper.init = (app) => {
        const dbUrl = `mongodb://localhost:27017/${process.env.DB_NAME}`;
        const options = {
            promiseLibrary: Promise,
            connectTimeoutMS: 60000
        };
        MongoClient.connect(dbUrl, options)
        .then((database) => {
            app.locals.db = database;
            console.log('**************** Mongo Database Connection Success ****************');
            return database;
        })
        .catch((err) => {
            console.log(err + '=== Mongo Database Connection Error ===');
        });
 

    }

})(module.exports);


