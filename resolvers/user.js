const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { UserInputError } = require('apollo-server');


const User = require('../model/User');
const { SECRET_KEY } = require('../config');
const { registerValidations, userLoginValidations } = require('../utils/validations.js');
const { findOne } = require('../model/User');

function generateToken(user){
	return jwt.sign({
		id: user.id,
		email: user.email,
		username: user.username
	}, SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
	Mutation: {
		async login(_, { username, password }, context, info) {
			const { errors, valid } = userLoginValidations(username, password);
			const user = await User.findOne({username});
			if(!user){
				errors.general = 'User does not exist';
				throw new UserInputError('User not exist',{
					errors
				});
			}else{
				const match = await bcrypt.compare(password,user.password);
				if(!match){
					errors.general = 'Wrong credentials ';
					throw new UserInputError('Wrong credentials',{
						errors
					});

				}
			}
			if (!valid) {
				throw new UserInputError('Error', { errors });
			}
			const token = generateToken(user);
			return {
				...user._doc,
				id: user.id,
				token: token,
				username,
				email:user.email
			}

		},
		async register(_, { registerInput: { username, email, password, confirmPassword } }, context, info) {
			const { errors, valid } = registerValidations(username, email, password, confirmPassword);
			if (!valid) {
				throw new UserInputError('Errors', {
					errors
				});
			}
			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString()
			});
			const user = await User.findOne({ username });
			if (user) {
				throw new UserInputError('username taken', {
					errors: {
						username: 'this username is taken'
					}
				});
			}

			const res = await newUser.save();
			const token = generateToken(res);

			return {
				...res._doc,
				id: res.id,
				token: token,
				username,
				email
			}
		}
	}
}