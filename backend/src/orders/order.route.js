const express = require('express');
const router = express.Router();
const {
	create,
	findAll,
	findById,
	update,
	deleteById,
	findByEmail,
} = require('./order.controller');

router.post('/create', create);

router.get('/', findAll);

router.get('/:id', findById);

router.put('/:id', update);

router.delete('/:id', deleteById);

router.get('/email/:email', findByEmail);

module.exports = router;
