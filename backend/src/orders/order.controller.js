const Order = require('./order.model');

const create = async (req, res) => {
	try {
		const newOrder = await Order.create(req.body);
		res.status(201).send({
			message: 'Order created successfully',
			newOrder,
		});
	} catch (error) {
		res.status(500).send({ message: 'Error creating order' });
	}
};

const findAll = async (req, res) => {
	try {
		const orders = await Order.find().sort({ createdAt: -1 });
		res.status(200).send(orders);
	} catch (error) {
		res.status(500).send({ message: 'Error finding orders' });
	}
};

const findById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (!order) {
			return res.status(404).send({ message: 'Order not found' });
		}
		res.status(200).send(order);
	} catch (error) {
		res.status(500).send({ message: 'Error finding order' });
	}
};

const update = async (req, res) => {
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		if (!updatedOrder) {
			return res.status(404).send({ message: 'Order not found' });
		}
		res.status(200).send({
			message: 'Order updated successfully',
			updatedOrder,
		});
	} catch (error) {
		res.status(500).send({ message: 'Error updating order' });
	}
};

const deleteById = async (req, res) => {
	try {
		const deletedOrder = await Order.findByIdAndDelete(req.params.id);
		if (!deletedOrder) {
			return res.status(404).send({ message: 'Order not found' });
		}
		res.status(200).send({
			message: 'Order deleted successfully',
			deletedOrder,
		});
	} catch (error) {
		res.status(500).send({ message: 'Error deleting order' });
	}
};

module.exports = { create, findAll, findById, update, deleteById };
