const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

// Unique email ONLY
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('userModel', userSchema);
