const { body } = require('express-validator');

exports.validate = (method) => {
    switch (method){
        case 'userLogin' : {
            return [
                body('email','email doesnt exist').exists().isEmail(),
                body('password','password doesnt exist').exists()
            ]
        }
    }
}