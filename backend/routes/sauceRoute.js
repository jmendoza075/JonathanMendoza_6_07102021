const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauceControl');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//LIKE //
router.post('/:id/like', auth, sauceCtrl.likesDislikesSauce);

module.exports = router;
