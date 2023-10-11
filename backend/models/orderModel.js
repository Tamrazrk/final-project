const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    products: {
        type: Array,
    },
    cost: {
        type: Number,
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);