const userRouter = ( () => {
    'use strict';

    const express = require('express');
    const userRouter = express.Router();
    const HTTPStatus = require('http-status');
    const moduleConfig = require('./user-profile.config');
    const userController = require('./user-profile.controller');
    const validator = require('../../validator/user.validator');
    const response = require('../../common/responseHandler');

    const userLogin = async(req, res, next) => {
        let resObj = false;
        resObj = await userController.userLogin(req, res, next);
        if(resObj){
            res.send(new response.SUCCESS(true, resObj, "Success").response);
        }else{
            res.status(500).json({"msg":"internal server error"});
        }
    }

    userRouter.route('/login/').post(validator.validate('userLogin'), userLogin);

    return userRouter
})();

module.exports = userRouter;
