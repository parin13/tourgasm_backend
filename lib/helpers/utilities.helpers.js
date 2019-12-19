((utilityHelper) => {

    'use strict';
    const sanitizeHtml = require('sanitize-html');
    

    utilityHelper.sanitizeUserInput = (req, next) => {
        try {
            const modelInfo = {};

            for (let i = 0, keys = Object.keys(req.body); i < keys.length; i++) {
                if (typeof req.body[keys[i]] !== 'object') {

                    modelInfo[keys[i]] = sanitizeHtml(req.body[keys[i]]).trim();
                }
            }
            return modelInfo;
        }
        catch (err) {
            // return  next(err);
        }
    };

})(module.exports);