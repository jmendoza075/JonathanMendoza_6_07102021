const mongoose = require('mongoose');

// DATA MODEL for Like //
const likeSchema = mongoose.Schema({
	userId: { type: String, required: true },
	like: { type: Number },
});

module.exports = mongoose.model('like', likeSchema);
