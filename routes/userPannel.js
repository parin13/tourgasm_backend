const response = require('./responseHandler');
const util = require('./util')
var cryptoJS = require("crypto-js");


const login = async (req,res) => {
	try{
		const reqData =  req.body;
	
		let email = reqData.email;
		var password = reqData.password;
		
		password = cryptoJS.SHA256(password)
		password = cryptoJS.enc.Base64.stringify(password)
	
		db.collection('user_master').find({'email':email, 'password': password}).toArray((err,data) => {
			if (err) return res.status(400).send(new response.BAD_REQUEST(false, err, "db fetch error").response);
			if (data.length >0 ){
				return res.send(new response.SUCCESS(true, null, 'user login sucess').response);
			}else{
				res.status(400).send(new response.BAD_REQUEST(false, null, "invalid login").response);

			}
		});
	}catch(err){
		console.log(err)
		res.status(400).send(new response.BAD_REQUEST(false, err, "Some error occored").response);
	}
}


const signup = async (req, res) => {
	try {
		reqData = req.body

		let name = reqData.name
		let email = reqData.email
		let password = reqData.password

		util.commonObj.checkIfPresent(name, email, password)
		// await util.signup(res,res,name,email,password)

		db.collection('user_master').find({ 'email': email }).toArray((err, data) => {
			if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "db fetch error").response);
			console.log(data)
			console.log(data.length)
			if (data.length == 0) {
				console.log('inside length ==0 ')
				var password = cryptoJS.SHA256(password)
				password = cryptoJS.enc.Base64.stringify(password)

				let user_data = {
					name : name,
					email: email,
					password: password
				}
				db.collection('user_master').insertOne(user_data, (err, result) => {
					if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "db insertion error").response);
				});
			}

			if (data.length > 0) {
				console.log('inside length >0 ')
				console.log('user exist')
				return res.send(new response.SUCCESS(true, null, 'user exist').response);
			}
			res.send(new response.SUCCESS(true, null, 'sucessfully added').response);
		});
	} catch (err) {
		console.log(err)
		res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
	}
}

const enquireNow = async (req, res) => {
	try {
		console.log(req.body);
		let user_name = req.body.fullname;
		let phone = req.body.phone;
		let email = req.body.email;
		let date = req.body.date;
		let message = req.body.message;

		let req_data = {
			'email': email,
			'user_name': user_name,
			'phone': phone,
			'date': date,
			'message': message
		}
		db.collection('enquiry').insertOne(req_data, (err, result) => {
			if (err) {
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
	try {

		db.collection('enquiry').find({}).toArray((err, data) => {
			if (err) res.send(new response.BAD_REQUEST(false, err, "database error").response)
			if (data.length == 0) {
				res.send(new response.SUCCESS(true, null, "SUCCESS").response)
			} else {
				res.send(new response.SUCCESS(true, data, "SUCCESS").response)
			}
		})


	} catch (err) {
		console.log(err)
		res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
	}

}


const addReview =  async (req, res) => {
	try{
		const post_data = req.body

		let name = post_data.name		
		let email = post_data.email
		let activity = post_data.activity
		let review = post_data.review
		let stars = post_data.stars

		// util.commonObj.checkIfPresent(res,name,email,activity,review,stars)

		let insert_params = {
			name,
			email,
			activity,
			review,
			stars
		}

		db.collection('reviews').insertOne(insert_params, (err,data) =>{
			if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Some error occored").response);
			return res.send(new response.SUCCESS(true, null, "SUCCESS").response)
		});
		
		
	}catch (err){
		console.log(err)
		res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
	}
}


const getReviews = async(req,res) => {
	try{
		db.collection('reviews').find({}).toArray((err,data) =>{
			if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
			if(data.length > 0){
				console.log('fetching data')
				res.send(new response.SUCCESS(true, data, "SUCCESS").response)
			}
		});
	}catch(err){
		console.log(err)
		res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
	}
}

module.exports = {
	signup,
	login,
	enquireNow,
	fetchEnquiry,
	addReview,
	getReviews
}