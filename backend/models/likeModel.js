const mongoose = require('mongoose');

// DATA MODEL for Like //
const likeSchema = mongoose.Schema({
	userId: { type: String, required: true },
});

module.exports = mongoose.model('like', likeSchema);
