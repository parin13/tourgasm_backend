( (databaseHelper) => {
    'use strict';
    const Promise = require('bluebird');
    const dbConfig = require('../configs/database.config');
    const mongodb = Promise.promisifyAll(require('mongodb'));
    const MongoClient = mongodb.MongoClient;


    databaseHelper.init = async (app) => {
        const dbUrl = `mongodb://localhost:27017/${process.env.DB_NAME}`;
        const options = {
            promiseLibrary: Promise,
            connectTimeoutMS: 60000
        };
        try{
            const db = await MongoClient.connect(dbUrl, options);
            app.locals.db = db;
            console.log('**************** Mongo Database Connection Success ****************');
        }catch(e){
            console.log(e);
        }

    }

})(module.exports);


const url = "mongodb://localhost:27017/";
