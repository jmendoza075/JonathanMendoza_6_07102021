const multer = require('multer');

const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images');
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(' ').join('_'); //<-to avoid whit space//
		const extension = MIME_TYPES[file.mimetype]; //<- imagefile extension using MIME Types
		callback(null, name + Date.now() + '.' + extension);
	},
});

module.exports = multer({ storage: storage }).single('image');
