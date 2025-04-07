const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./user.model');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/admin', async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}

		if (user.password !== password) {
			return res.status(401).send({ message: 'Invalid password' });
		}

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
				role: user.role,
			},
			JWT_SECRET,
			{ expiresIn: '1h' }
		);

		return res.status(200).json({
			message: 'Login successful',
			token,
			user: {
				username: user.username,
				role: user.role,
			},
		});
	} catch (error) {
		console.log('Failed to login as admin', error);
		res.status(401).send({ message: 'Failed to login as admin' });
	}
});

module.exports = router;
