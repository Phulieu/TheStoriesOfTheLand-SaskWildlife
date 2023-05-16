import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_IP || 'localhost';
console.log(backendURL)
// Base URL with axios
const api = axios.create({
    baseURL : `http://${backendURL}:3001/api`,
    "Content-Type": 'application/json'
});

const setHeader = ()=>{
    return{
        headers: {
        Authorization: `bearer ${sessionStorage.getItem("token")}`
    }
    };
};

// login
const login = async(payload) => {
    const res = await api.post('/login', payload);
    sessionStorage.setItem("token", res.data.token);
    return res;
};

//API call to get all plants from database 
const getAllPlants = async () => {
    return api.get('/plant',setHeader());
};

//API call to get plant by ID from database 
const getPlantById= async (id) => {
    return api.get(`/plant/${id}`);
};

//API call to create new specimen information from database 
const createPlant = async (payload) => {
    return api.post('/plant',payload,setHeader());
};

// API call to upload image file and store it in the server
const uploadImage = async(image)=>{
    const formData = new FormData();
    formData.append("image", image);

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            ...setHeader().headers,
        },
    };
    return api.post('/upload', formData, config);
};

// return API calls
const apiCalls = {
    getAllPlants,
    getPlantById,
    createPlant,
    login,
    uploadImage,
}

export default apiCalls;
