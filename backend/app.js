// PACKAGE IMPORTATION //
const express = require('express');
const userRoutes = require('./routes/userRoute');
const sauceRoutes = require('./routes/sauceRoute');

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

//ROUTES
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
// EXPORT APPLICATION
module.exports = app;
