const mongoose = require('mongoose');

const EarnSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    amount: {
        type: Number,
    },
    rate: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
    },
    matured : {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Earn', EarnSchema);
