const Sauce = require('../models/sauceModel');

//FILE SYSTEM
const fs = require('fs');

// C.R.U.D //
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${
			req.file.filename
		}`,
		likes: 0,
		dislikes: 0,
		usersLiked: [' '],
		usersdisLiked: [' '],
	});

	sauce
		.save()
		.then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
		.catch((error) => res.status(400).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
	Sauce.find()
		.then((sauces) => res.status(200).json(sauces))
		.catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => res.status(200).json(sauce))
		.catch((error) => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
	const sauceObject = req.file
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get('host')}/images/${
					req.file.filename
				}`,
		  }
		: { ...req.body };
	Sauce.updateOne(
		{ _id: req.params.id },
		{ ...sauceObject, _id: req.params.id }
	)
		.then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
		.catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const filename = sauce.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

// LIKES , DISLIKES //
exports.likesDislikesSauce = (req, res, next) => {
	let likesOrDislikes = req.body.like;
	let userId = req.body.userId;
	let sauceId = req.params.id;

	switch (likesOrDislikes) {
		// Increment Likes //
		case 1:
			Sauce.updateOne(
				{ _id: sauceId },
				{ $push: { usersLiked: userId }, $inc: { likes: +1 } }
			)
				.then(() => res.status(200).json({ message: `J'aime` }))
				.catch((error) => res.status(400).json({ error }));

			break;

		// Cancel Likess or Dislikes //
		case 0:
			Sauce.findOne({ _id: sauceId })
				.then((sauce) => {
					// Cancel Like //
					if (sauce.usersLiked.includes(userId)) {
						Sauce.updateOne(
							{ _id: sauceId },
							{ $pull: { usersLiked: userId }, $inc: { likes: -1 } }
						)
							.then(() => res.status(200).json({ message: `J'aime annulé` }))
							.catch((error) => res.status(400).json({ error }));
					}

					// Cancel Dislike //
					if (sauce.usersDisliked.includes(userId)) {
						Sauce.updateOne(
							{ _id: sauceId },
							{ $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
						)
							.then(() =>
								res.status(200).json({ message: `Je n'aime pas annulé` })
							)
							.catch((error) => res.status(400).json({ error }));
					}
				})
				.catch((error) => res.status(404).json({ error }));
			break;

		// Increment Dislikes //
		case -1:
			Sauce.updateOne(
				{ _id: sauceId },
				{ $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
			)
				.then(() => {
					res.status(200).json({ message: `Je n'aime pas` });
				})
				.catch((error) => res.status(400).json({ error }));
			break;

		default:
			console.log("Pas d'autre choix");
	}
};
