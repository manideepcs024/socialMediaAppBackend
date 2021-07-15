const { AuthenticationError} = require('apollo-server');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config.js');

module.exports = (context) =>{
	const authHeaders = context.req.headers.authorization;
	if(authHeaders){
		try{
			const token = authHeaders.split('Bearer ')[1];
			console.log("tokenis", token);
			if(token){
				const user = jwt.verify(token,SECRET_KEY);
				console.log('aa',token);
				if(user) return user;
			}
			throw new Error('Invalid token, format should be \'Bearer');

		}catch(err){
			throw new AuthenticationError('Inavalid token or expired token');
		}

	}else{
		throw new Error('Authorization header not provided');
	}
}