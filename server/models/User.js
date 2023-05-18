const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	password: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now
	},
	transactionHistory: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TransactionHistory'
	}],
	portfolio: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Portfolio'
	}],
	earn: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Earn'
	}]
});

module.exports = mongoose.model('User', UserSchema);
