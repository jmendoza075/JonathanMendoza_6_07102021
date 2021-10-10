const express = require('express');

// Mongoose Dbase Connect
const mongoose = require('mongoose');

mongoose
	.connect(
		'mongodb+srv://jmendozaP6:YmA1MhlSEzGPjJRc@cluster0.cehtx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//CORS solution
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	);
	next();
});

//Pour extraire l'objet JSON
app.use(express.json());

/// midllewares

app.post('/api/sauces', (req, res, next) => {
	console.log(req.body);
	res.status(201).json({
		message: 'Objet créé galing sa client!',
	});
});

app.use('/api/sauces', (req, res, next) => {
	const stuff = [
		{
			_id: 'oeihfzeoi',
			title: 'Mon premier objet',
			description: 'Les infos de mon premier objet',
			imageUrl:
				'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
			price: 4900,
			userId: 'qsomihvqios',
		},
		{
			_id: 'oeihfzeomoihi',
			title: 'Mon deuxième objet',
			description: 'Les infos de mon deuxième objet',
			imageUrl:
				'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
			price: 2900,
			userId: 'qsomihvqios',
		},
	];
	res.status(200).json(stuff);
});

module.exports = app;
