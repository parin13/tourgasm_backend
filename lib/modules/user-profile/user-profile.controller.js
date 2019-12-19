const  userController = ( () => {
    'use strict';
    const utilityHelper = require('../../helpers/utilities.helpers');
    function userProfile() {}

    const _p = userProfile.prototype;

    _p.userLogin = async (req, res, next) => {
        try{
            const userInput = utilityHelper.sanitizeUserInput(req,next);
            let response = {}
            const queryParam = {
                email : userInput.email,
                password : userInput.password
            }

            console.log(req.db);
            const resp = await req.db.collection('user_master').find(queryParam).toArray();
            if (resp && resp.length > 0){
                response = {
                    status : "success",
                    message : "login sucess",    
                    statusCode : 200,
                    email : resp[0].email,
                    role : resp[0].role ? resp[0].role : 'undefined'
                }
            }else{
                response = {
                    status : "failed",
                    message : "username and pw doesnt match",
                    statusCode : 400
                }
            }
            return response;

        }catch(e){
            var stack = new Error().stack
            req.logger.error(e,stack);
            return false;
        }
    }

    return {
        userLogin: _p.userLogin
    };

})();

module.exports = userController;