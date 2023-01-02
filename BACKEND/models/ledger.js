//pay.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ledgerSchema = new Schema({

	cashBalance: {
		type: Number,
		required: true
	},
	debitBalance: {
		type: Number,
		required: true
	},
	totalDebt: {
		type: Number,
		required: true
	}
})

module.exports = mongoose.model('ledger', ledgerSchema);
