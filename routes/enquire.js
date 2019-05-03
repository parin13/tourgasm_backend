const response = require('./responseHandler');

const enquireNow = async (req, res) => {
    try {
        console.log(req.body);
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

module.exports = {
    enquireNow
}