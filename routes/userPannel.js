const response = require('./responseHandler');
const util = require('./util')


const enquireNow = async (req, res) => {
    try {
        console.log(req.body);
        let user_name = req.body.fullname;
        let phone = req.body.phone;
        let email = req.body.email;
        let date = req.body.date;
        let message = req.body.message;

        let req_data = {
        	'email':email,
        	'user_name' : user_name,
        	'phone': phone,
        	'date': date,
        	'message': message
        }
        db.collection('enquiry').insertOne(req_data, (err, result) => {
        	if(err) {
        		res.status(400).send(new response.BAD_REQUEST(false, err, 'Db error').response);
        	}

        	res.send(new response.SUCCESS(true, null, 'sucessfully added').response);
        });
    } catch (err) {
    	console.log(err)
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const fetchEnquiry = async (req, res) => {
	try{

		db.collection('enquiry').find({}).toArray((err, data) => {
			if (err) res.send(new response.BAD_REQUEST(false, err, "database error").response)
			if (data.length == 0){
				res.send(new response.SUCCESS(true, null, "SUCCESS").response)
			}else{
				res.send(new response.SUCCESS(true, data, "SUCCESS").response)
			}
		})

			
	} catch(err){
		console.log(err)
		res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
	}

}


const signup = async (req, res) => {
	try{
		reqData = req.body

		let name = reqData.name
		let email = reqData.email
		let password = reqData.password

		util.commonObj.checkIfPresent(name,email,password)
		util.signup(res=res,name=name,email=email,password=password)

		res.send(new response.SUCCESS(true, null, 'sucessfully added').response);

	}catch(err){
		console.log(err)
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
	}
} 

module.exports = {
	signup,
    enquireNow,
    fetchEnquiry
}