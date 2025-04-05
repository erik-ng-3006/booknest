const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);

// Routes
const bookRoutes = require('./src/books/book.route');
app.use('/api/books', bookRoutes);

async function main() {
	// Connect to MongoDB
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
