const mongoose = require('mongoose');

const TransactionHistorySchema = new mongoose.Schema({
    transactionType: {
        type: String,
        enum: ['buy', 'sell', 'transfer', 'withdraw', 'deposit'],
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
    },
    transferredTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});

module.exports = mongoose.model('TransactionHistory', TransactionHistorySchema);
