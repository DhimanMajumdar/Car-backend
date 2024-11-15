// routes/carRoutes.js
const express = require('express');
const { createCar, getCars, getCarById, updateCar, deleteCar } = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', authMiddleware, upload.array('images', 10), createCar);
router.get('/', authMiddleware, getCars);
router.get('/:id', authMiddleware, getCarById);
router.put('/:id', authMiddleware, updateCar);
router.delete('/:id', authMiddleware, deleteCar);

module.exports = router;
