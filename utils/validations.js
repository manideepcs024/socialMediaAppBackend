module.exports.registerValidations = (
	username,
	email,
	password,
	confirmPassword
) => {
	const errors = {}
	if (username.trim() === '') {
		errors.username = 'username can not be empty'
	}
	if (email.trim() === '') {
		errors.email = "Email can not be empty"
	} else {
		const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!email.match(regEx)) {
			errors.email = "Email must be a valid email address";
		}
	}
	if (password === '') {
		errors.password = "Password can not be empty"
	}
	if (confirmPassword === '') {
		errors.confirmPassword = "Confirm Password can not be empty"
	} else if (password !== confirmPassword) {
		errors.password = "Passwords do not match"
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1
	}
}

module.exports.userLoginValidations = (username, password) => {
	const errors = {};
	if (username.trim() === '') {
		errors.username = "username can not be empty"
	}
	if (password === '') {
		errors.password = "Password can not be empty"
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1
	}
}