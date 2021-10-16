// PACKAGE IMPORTATION //
const express = require('express');

//ADDED SECURITY :  Helmet and DotEnv
const helmet = require('helmet');
require('dotenv').config();

const userRoutes = require('./routes/userRoute');
const sauceRoutes = require('./routes/sauceRoute');

//PATH FOR STATIC IMAGE
const path = require('path');

// MONGOOSE packages for Node.js. to CONNECT Dbase  //
const mongoose = require('mongoose');
mongoose
	.connect(process.env.MY_DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));

// EXPRESS and HELMET PACKAGE //
const app = express();

//HELMET PACKAGE //
app.use(helmet());

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

//FOR STATIC IMAGE
app.use('/images', express.static(path.join(__dirname, 'images')));

//ROUTES
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// EXPORT APPLICATION
module.exports = app;
