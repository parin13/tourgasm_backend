const userRouter = ( () => {
    'use strict';

    const express = require('express');
    const userRouter = express.Router();
    const HTTPStatus = require('http-status');
    const moduleConfig = require('./user-profile.config');
    const userController = require('./user-profile.controller');
    const validator = require('../../validator/user.validator');

    const userLogin = async(req, res, next) => {
        let resObj = false;
        resObj = await userController.userLogin(req, res, next);
        if(resObj){
            res.status(resObj.statusCode).json(resObj);
        }else{
            res.status(400).json({"msg":"internal server error"});
        }
    }

    userRouter.route('/login/').post(validator.validate('userLogin'), userLogin);

    return userRouter
})();

module.exports = userRouter;
