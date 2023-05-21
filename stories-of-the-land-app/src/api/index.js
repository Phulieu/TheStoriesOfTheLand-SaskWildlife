import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_IP || 'localhost';

// Base URL with axios
const api = axios.create({
  baseURL: `http://${backendURL}:3001/api`,
});

const setHeader = () => {
  const token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return { headers };
};

// login
const login = async (payload) => {
  const res = await api.post('/login', payload);
  sessionStorage.setItem("token", res.data.token);
  return res;
};
// logout
const logout = async (payload) => {
  const res = await api.post('/logout');
  sessionStorage.setItem("token", res.data.token);
  return res;
};

// API call to get all plants from the database
const getAllPlants = async () => {
  return api.get('/plant', setHeader());
};

// API call to get plant by ID from the database
const getPlantById = async (id) => {
  return api.get(`/plant/${id}`, setHeader());
};

//delete
const deletePlant = async (id) => {
  return api.delete(`/plant/${id}`, setHeader());
};

// API call to create new specimen information in the database
const createPlant = async (payload) => {
    console.log(payload);
    try {
        const formData = new FormData();
        formData.append("plantName", payload.plantName);
        formData.append("story", payload.story);
        formData.append("image", payload.image);
        formData.append("audio", payload.audio);
        console.log([...formData]);


        const response = await api.post('/plant', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        console.log(response)
        return response.data;
      } catch (error) {
        console.error("Create plant error:", error.response);
        throw error;
      }
};

// return API calls
const apiCalls = {
  getAllPlants,
  getPlantById,
  createPlant,
  deletePlant,
  login,
  logout
};

export default apiCalls;
