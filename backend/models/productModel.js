const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        unique: true,
    },

    price: {
        type: Number,
        required: [true, "Please add a price"]
    },

    category: {
        type: String,
        required: [true, "Please add a category"]
    },

    image_url: {
        type: String,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
     }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);