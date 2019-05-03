'use strict'
const common =  require('./common')
const commonObj = new common.commonCls()
const response = require('./responseHandler');

var cryptoJS = require("crypto-js");



function signup(name,email,password){
    try{
        console.log('inside signu')
        db.collection('user_master').find({'email':email}).toArray((err,data) =>{
            if (err) throw "database fetch error"
            if (data.length == 0){
                var password =  cryptoJS.SHA256(password)
                password = cryptoJS.enc.Base64.stringify(password)
    
                let user_data = {
                    'name': name,
                    'email': email,
                    'password': password
                }
                db.collection('user_master').insertOne(user_data, (err, result) => {
                    if (err) throw "database insertion error"
                });
            }
    
            if(data.lenght >0 ){
                console.log('user exist')
                throw "user_exist"
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