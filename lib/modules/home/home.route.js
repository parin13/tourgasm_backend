const homeRouter = ( () => {
    'user strict';

    const express = require('express');
    const homeRouter = express.Router();
    const HTTPStatus = require('http-status');
    const moduleConfig = require('./home.config');
    const homeController = require('./home.controller');
    const response = require('../../common/responseHandler');


    const getHomeVideo = async(req, res, next) => {
        let resObj = false;
        resObj = await homeController.getHomeVideo(req, res, next);
        if(resObj){
            res.send(new response.SUCCESS(true, resObj, "Success").response);
        }else{
            res.status(500).json({"msg":"internal server error"});
        }
    }

    const setHomeVideo = async(req, res, next) => {
        let resObj = false;
        resObj = await homeController.setHomeVideo(req, res, next);
        if(resObj){
            res.send(new response.SUCCESS(true, resObj, "Success").response);
        }else{
            res.status(500).json({"msg":"internal server error"});
        }
    }

    const updateHomeVideo = async(req, res, next) => {
        let resObj = false;
        resObj = await homeController.updateHomeVideo(req, res, next);
        if(resObj){
            res.send(new response.SUCCESS(true, resObj, "Success").response);
        }else{
            res.status(500).json({"msg":"internal server error"});
        }
    }

    homeRouter.route('/getHomeVideo').get(getHomeVideo);
    homeRouter.route('/setHomeVideo').post(setHomeVideo);
    homeRouter.route('/updateHomeVideo').put(updateHomeVideo);

    return homeRouter;

})();

module.exports = homeRouter;