import axios from "axios";

// Base URL with axios
const api = axios.create({
    baseURL : 'http://localhost:3001/api'
});

//API call to get all plants from database 
const getAllPlants = async () => {
    return api.get('/plant');
};

//API call to get plant by ID from database 
const getPlantById= async (id) => {
    return api.get(`/plant/${id}`);
};

//API call to create new specimen information from database 
const createPlant = async (payload) => {
    return api.post('/plant',payload);
};

// return API calls
const apiCalls = {
    getAllPlants,
    getPlantById,
    createPlant
}

export default apiCalls;
