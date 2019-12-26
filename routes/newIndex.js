( (applicationRoutes) => {
    'use strict';

    applicationRoutes.init = (app) => {
        const baseApi = "/api";

        const userRouter = require('../lib/modules/user-profile/user-profile.route');
        app.use(`${baseApi}/user`, userRouter);

        const homeRouter = require('../lib/modules/home/home.route');
        app.use(`${baseApi}/home`, homeRouter);

        const oldApi = require('../lib/modules/oldApis/oldApis.route');
        app.use(`/`, oldApi);
    

    };

})(module.exports);
