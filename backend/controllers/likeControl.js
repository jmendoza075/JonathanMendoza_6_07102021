const Like = require('../models/likeModel');

exports.likeOneSauce = (req, res, next) => {
	const newLike = new Like({
		...req.body,
	});
	console.log(req.body);
	newLike
		.save()
		.then(() => res.status(201).json({ message: 'Like saved in DB!' }))
		.catch((error) => res.status(400).json({ error }));
};
