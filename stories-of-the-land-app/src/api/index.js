import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
});

const getAllPlant = async () => {
    return api.get('/plant');
};

const getPlantById = async (id) => {
    return api.get(`/plant/${id}`);
};

const apiCalls = {
    getAllPlant,
    getPlantById
};

export default apiCalls;
