
( (logs) => {
    'use strict';
  
    const winston = require('winston');
    const logConfig =  require('./logger.config');
    let config,logger;
    
    try{
        logs.init = async(app) =>{
            config =  logConfig.tourgasmLogger;
            logger = winston.createLogger(config);
            app.locals.logger = logger;
            console.log("****************WINSTON LOGGER CONNECTION SUCESS************");
        };
    }catch(e){
        console.log("error in logger connection ",e);
    }

  })(module.exports)
  