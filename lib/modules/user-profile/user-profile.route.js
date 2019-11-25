const userRoutes = ( () => {
    'use strict';

    const express = require('express');
    const userRouter = express.Router();
    const HTTPStatus = require('http-status');
    const moduleConfig = require('./user-profile.config');
    const userController = require('./user-profile.controller');

    const userLogin = async(req, res, next) => {
        let resObj = await userController.userLogin(req, res, next);
        res.status(resObj.status).json(resObj);
    }

    userRoutes.route('/login/').post(userLogin);


})();

module.exports = userRoutes;
