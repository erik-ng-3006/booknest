const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

async function main() {
	await mongoose.connect(process.env.MONGODB_URL);

	app.use('/', (req, res) => {
		res.send('Booknest Server!');
	});
}

main()
	.then(() => console.log('Connected to MongoDB successfully'))
	.catch((err) => console.log(err));

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
