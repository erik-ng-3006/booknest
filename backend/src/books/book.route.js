const express = require('express');
const router = express.Router();
const {
	create,
	findAll,
	findById,
	update,
	deleteById,
} = require('./book.controller');
const verifyToken = require('../middleware/verifyToken');

router.post('/create', verifyToken, create);

router.get('/', findAll);

router.get('/:id', findById);

router.put('/:id', verifyToken, update);

router.delete('/:id', verifyToken, deleteById);

module.exports = router;
