'use strict'
const response = require('./responseHandler');
var sanitizer = require('sanitize')();

class commonCls{

    constructor(){
        console.log('inside constructor')
     }
     
     checkIfPresent(...args) {
        for (let arg of args){
            if( typeof arg === 'undefined' || arg === null ){
                res.status(400).send(new response.BAD_REQUEST(false, err, "please  pass required parameters").response)	
            }
        } 
    }
    
    
}

module.exports = {
    commonCls
}
