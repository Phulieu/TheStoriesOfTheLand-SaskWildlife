import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:3001/api'
});

//get all
const getAllPlants = async () => {
    return api.get('/plant');
};

// get by id
const getPlantById= async (id) => {
    return api.get(`/plant/${id}`);
};

// create
const createPlant = async (payload) => {
    return api.post('/plant',payload);
};

const apiCalls = {
    getAllPlants,
    getPlantById,
    createPlant
}

export default apiCalls;
