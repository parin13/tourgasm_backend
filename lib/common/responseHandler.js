exports.ERROR = function (status, result, msg) {
    this.response = {
        code: 500,
        status: (status) ? status : false,
        result: (result) ? result : null,
        msg: (msg) ? msg : 'some error occurred'
    };
    this.send = send;
};
exports.SUCCESS = function (status, result, msg) {
    this.response = {
        code: 200,
        status: (status) ? status : false,
        result: (result) ? result : null,
        msg: (msg) ? msg : 'Success'
    };
    this.send = send;
};
exports.CREATED = function (status, result, msg) {
    this.response = {
        code: 201,
        status: (status) ? status : false,
        result: (result) ? result : null,
        msg: (msg) ? msg : 'Success'
    };
    this.send = send;
};
exports.ACCEPTED = function (status, result, msg) {
    this.response = {
        code: 202,
        status: (status) ? status : false,
        result: (result) ? result : null,
        msg: (msg) ? msg : 'Success'
    };
    this.send = send;
};
exports.BAD_REQUEST = function (status, result, msg) {
    this.response = {
        code: 400,
        status: (status) ? status : false,
        result: (result) ? result : null,
        msg: (msg) ? msg : 'bad request'
    };
    this.send = send;
};
exports.AUTH_FAILED = function (status, result, msg) {
    this.response = {
        code: 401,
        status: (status) ? status : false,
        result: (result) ? result : null,
        msg: (msg) ? msg : 'auth failure'
    };
    this.send = send;
};
exports.NO_RECORD_FOUND = function (status, result, msg) {
    this.response = {
        code: 404,
        status: (status) ? status : false,
        result: (result) ? result : null,
        msg: (msg) ? msg : 'no record found'
    };
    this.send = send;
};
exports.NOT_FOUND = function (status, result, msg) {
    this.response = {
        code: 404,
        status: (status) ? status : false,
        result: (result) ? result : null,
        msg: (msg) ? msg : 'not found'
    };
    this.send = send;
};
exports.SERVER_TIMEDOUT = function (status, result, msg) {
    this.response = {
        code: 408,
        status: (status) ? status : false,
        result: (result) ? result : null,
        msg: (msg) ? msg : 'server timed out'
    };
    this.send = send;
};
exports.CONFLICT = function (status, result, msg) {
    this.response = {
        code: 409,
        status: (status) ? status : false,
        result: (result) ? result : null,
        msg: (msg) ? msg : 'conflict'
    };
    this.send = send;
};

// optional_json is used when you append some extra object to send method
// for ex send({})
var send = function (res, optional_json) {
    if (optional_json)
        this.jsonresponse[optional_json.name] = optional_json.data;

    var statusCode = this.jsonresponse.code;
    // let result = {
    //     result: this.jsonresponse.result
    // };
    // let msg = {
    //     msg: this.jsonresponse.msg
    // };
    // delete this.jsonresponse.code;

    res.status(statusCode).json(this.jsonresponse);
};