'use strict'
const common =  require('./common')
const commonObj = new common.commonCls()
const response = require('./responseHandler');

var cryptoJS = require("crypto-js");



function signup(res,req,name,email,password){
    try{
        console.log('inside signup')
        db.collection('user_master').find({'email':email}).toArray((err,data) =>{
            if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "db fetch error").response);
            console.log(data)
            console.log(data.length)
            if (data.length == 0){
                console.log('inside length ==0 ')
                var password =  cryptoJS.SHA256(password)
                password = cryptoJS.enc.Base64.stringify(password)
    
                let user_data = {
                    'name': name,
                    'email': email,
                    'password': password
                }
                db.collection('user_master').insertOne(user_data, (err, result) => {
                    if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "db insertion error").response);
                });
            }
    
            if (data.length > 0){
                console.log('inside length >0 ')
                console.log('user exist')
                res.send(new response.SUCCESS(true, null, 'user exist').response);
            } 
        });
    }catch (err){
        console.log(err)
        throw err
    }

}


module.exports = {
    commonObj,
    signup
}