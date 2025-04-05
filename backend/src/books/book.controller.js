const Book = require('./book.model');

const create = async (req, res) => {
	try {
		const book = await Book(req.body);
		await book.save();
		res.status(201).send({ message: 'Book created successfully', book });
	} catch (error) {
		res.status(500).send({ message: 'Error creating book' });
	}
};

const findAll = async (req, res) => {
	try {
		const books = await Book.find().sort({ createdAt: -1 });
		res.status(200).send(books);
	} catch (error) {
		res.status(500).send({ message: 'Error finding books' });
	}
};

const findById = async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);

		if (!book) {
			return res.status(404).send({ message: 'Book not found' });
		}

		res.status(200).send(book);
	} catch (error) {
		res.status(500).send({ message: 'Error finding book' });
	}
};

const update = async (req, res) => {
	const { id } = req.params;

	try {
		const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updatedBook) {
			return res.status(404).send({ message: 'Book not found' });
		}
		res.status(200).send({
			message: 'Book updated successfully',
			updatedBook,
		});
	} catch (error) {
		res.status(500).send({ message: 'Error updating book' });
	}
};

const deleteById = async (req, res) => {
	try {
		const deletedBook = await Book.findByIdAndDelete(req.params.id);
		if (!deletedBook) {
			return res.status(404).send({ message: 'Book not found' });
		}
		res.status(200).send({
			message: 'Book deleted successfully',
			deletedBook,
		});
	} catch (error) {
		res.status(500).send({ message: 'Error deleting book' });
	}
};

module.exports = { create, findAll, findById, update, deleteById };
