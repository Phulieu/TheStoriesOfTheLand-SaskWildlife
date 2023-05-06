const express = require('express');

const plantController = require('../controllers/controller');

const router = express();

// GET ALL
router.get('/plant', plantController.getAllPlant);

// GET BY ID
router.get('/plant/:id', plantController.getPlantById);

// CREATE plant 
router.post('/plant', plantController.createPlant);


module.exports = router;