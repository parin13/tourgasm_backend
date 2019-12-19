const  userController = ( () => {
    'use strict';
    const utilityHelper = require('../../helpers/utilities.helpers');
    function userProfile() {}

    const _p = userProfile.prototype;

    _p.userLogin = async (req, res, next) => {
        try{
            const userInput = utilityHelper.sanitizeUserInput(req,next);
            console.log(userInput);

            const queryParam = {
                email : userInput.email,
                password : userInput.password
            }
            console.log(req);
            req.logger.info("inside asdf");

        }catch(e){
            return false;
        }
    }

    return {
        userLogin: _p.userLogin
    };

})();

module.exports = userController;