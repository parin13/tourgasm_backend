const homeRouter = ( () => {
    'user strict';

    const express = require('express');
    const homeRouter = express.Router();
    const HTTPStatus = require('http-status');
    const moduleConfig = require('./home.config');
    const homeController = require('./home.controller');

    const getHomeVideo = async(req, res, next) => {
        let resObj = false;
        resObj = await homeController.getHomeVideo(req, res, next);
        if(resObj){
            res.status(resObj.statusCode).json(resObj);
        }else{
            res.status(500).json({"msg":"internal server error"});
        }
    }

    homeRouter.route('/getHomeVideo').get(getHomeVideo);

    return homeRouter;

})();

module.exports = homeRouter;