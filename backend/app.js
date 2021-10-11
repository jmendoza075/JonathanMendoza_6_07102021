// PACKAGE IMPORTATION //
const express = require('express');
const userRoutes = require('./routes/userRoute');

// MONGOOSE Dbase CONNECT //
const mongoose = require('mongoose');
mongoose
	.connect(
		'mongodb+srv://jmendozaP6:YmA1MhlSEzGPjJRc@cluster0.cehtx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));

// EXPRESS PACKAGE //
const app = express();

// SOLUTION TO AVOID CORS « Cross Origin Resource Sharing » //
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

// JSON OBJECT EXTRACTION. note: body-parser not installed it is  already incuded in Express v4.16 //
app.use(express.json());

// MIDDLEWARES

app.post('/api/sauces', (req, res, next) => {
	console.log(req.body);
	res.status(201).json({
		message: 'goodmorning Objet créé galing sa client!',
	});
});

app.use('/api/sauces', (req, res, next) => {
	const stuff = [
		{
			name: 'unang sili',
			manufacturer: 'bahay',
			description: 'ang anghang',
			mainPepper: 'sili',
			imageUrl:
				'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
			heat: 6,
			likes: 1,
			dislikes: 1,
			usersLiked: ' ',
			usersDisliked: ' ',
		},
	];
	res.status(200).json(stuff);
});

//ROUTES
app.use('/api/auth', userRoutes);

// EXPORT APPLICATION
module.exports = app;
