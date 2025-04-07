const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	namename: { type: String, required: true },
	password: { type: String, required: true },
	role: {
		type: String,
		enum: ['user', 'admin'],
		required: true,
	},
});
userSchema.pre('save', async function (next) {
	// If the password hasn't changed, we don't need to re-hash it
	if (!this.isModified('password')) return next();

	// The password has changed, so we hash it
	const hashedPassword = await bcrypt.hash(this.password, 10);

	// We update the user object with the hashed password
	this.password = hashedPassword;

	// We move on to the next middleware
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
