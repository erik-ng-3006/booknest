const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		category: { type: String, required: true },
		coverImage: { type: String, required: true },
		oldPrice: { type: Number, required: true },
		newPrice: { type: Number, required: true },
		trending: { type: Boolean, required: true },
		createdAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Book', bookSchema);
