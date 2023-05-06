const Plant = require('../db/models/Plants');

const getAllPlant = async (req, res) => {
    Plant.find().then((plants) => {
        if (!plants.length) {
            return res.status(404).json({ success: false, error: "No plants found." });
        }
        return res.status(200).json({ success: true, data: plants });
    }).catch((err) => {
        return res.status(400).json({ success: false, error: err });
    });
};

const getPlantById = async (req, res) => {
    Plant.findById(req.params.id).then((plant) => {
        return res.status(200).json({ success: true, data: plant });
    }).catch((err) => {
        return res.status(400).json({ success: false, error: err });
    });
};

const createPlant = async (req, res) => {
    const body = req.body;
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, error: "You must provide plant information" });
    }
    const plant = new Plant(body);
    if (!plant) {
        return res.status(400).json({ success: false, error: "The plant was not created." });
    }
    plant.save().then(() => {
        return res.status(200).json({ success: true, message: "Plant created" });
    }).catch((err) => {
        return res.status(400).json({ success: false, error: err });
    });
};



module.exports = {
    getAllPlant,
    getPlantById,
    createPlant
   
};