const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

const createOrder = asyncHandler(async (req, res) => {
    const user = req.user;

    const result = {
        ...req.body,
        owner: user._id,
        cost: req.body.cost,
    }

    const owner = await User.findOne({_id: user._id});

    owner.balance -= req.body.cost;

    await owner.save();
    
    await Order.create(result);

    res.status(201).json(result);
});

const getOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const orders = await Order.find({owner: userId});

    res.status(200).json(orders);
})

module.exports = {
    createOrder,
    getOrders,
}