const  userController = ( () => {
    'use strict';

    function userProfile() {}

    const _p = userProfile.prototype;

    _p.userLogin = async (req, next) => {
        try{
            
        }catch(e){
            console.log("error : ",e);
        }
    }

    return {
        userLogin: _p.userLogin
    };

})();

module.exports = userController;