const homeController = (() => {
    'use strict';
    const utilityHelper = require('../../helpers/utilities.helpers');

    function home() {}

    const _p = home.prototype;

    _p.getHomeVideo = async(req, res, next) => {
        try{
            

        }catch(e){
            var stack = new Error().stack
            req.logger.error(e,stack);
            return false;
        }
    }

    return{
        home : _p.getHomeVideo
    }

})();

module.exports = homeController;