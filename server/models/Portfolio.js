const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    symbol: {
        type: String,
    },
    amount: {
        type: Number,
    },
    price: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
