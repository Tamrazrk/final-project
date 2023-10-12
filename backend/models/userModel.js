const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    country: {
        type: String,
    },
    address: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    balance: {
        type: Number,
        default: 10000,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }]
},
{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);