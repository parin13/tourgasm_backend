const response = require('./responseHandler');


const getCollectionByCategory = async (req, res) => {
    try {
        db.collection("packages").find({
            
        }).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                result[0].imgUrl = `${req.protocol}://${req.get('host')}/${result[0].path}/${result[0].fileName}`;
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });

    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

module.exports = {
    getCollectionByCategory
}