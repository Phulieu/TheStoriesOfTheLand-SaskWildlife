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

// API get all user
const getAllUser = async () => {
  return api.get('/userManagement',setHeader());
}

// API to register
const registerUser = async (payload) => {
  return api.post('/register',payload,setHeader());
}

// API to reset password 
const resetPassword = async (id,payload) => {
  return api.put(`/userManagement/${id}`,payload,setHeader());
}
// API to delete password

const deleteUser = async (id) => {
  return api.delete(`/userManagement/${id}`,setHeader());
}
// API call to get all plants from the database
const getAllPlants = async () => {
  return api.get('/plant', setHeader());
};

// API call to get plant by ID from the database
const getPlantById = async (id) => {
  return api.get(`/plant/${id}`);
};

//delete
const deletePlant = async (id) => {
  console.log("delete id "+id);
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
       // console.log("Form data"+[...formData]);
        console.log("working...");

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

// API call to create new specimen information in the database
const updatePlant = async (payload,id) => {
  console.log(" payload name"+payload.plantName );
  console.log(" payload story"+payload.story );
  console.log(" payload image"+payload.image.name );
  console.log(" payload audio"+payload.audio);
  
  try {
      const formData = new FormData();
      formData.append("plantName", payload.plantName);
      formData.append("story", payload.story);
      formData.append("image", payload.image);
      formData.append("audio", payload.audio);
     console.log("form data"+[...formData]);


      const response = await api.put(`/plant/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      console.log("response from  server"+response)
      return response.data;
    } catch (error) {
      console.error("Create plant error:", error.response);
      throw error;
    }
};

// API call to create new feedback in the feedback database
const createFeedback = async (payload) => {
  return api.post('/feedback',payload);
};

// API call to get all feedback from the database
const getAllFeedback = async () => {
  return api.get('/feedback', setHeader());
};
// API call to get all feedback from the database
const getFeedbackCount = async () => {
  return api.get('/feedback/count', setHeader());
};

//API call to delete feedback
//delete feedback
const deleteFeedBack = async (id) => {  
  console.log("delete id "+id);
  return api.delete(`/feedback/${id}`, setHeader());
  
};

// return API calls
const apiCalls = {
  getAllPlants,
  getPlantById,
  createPlant,
  deletePlant,
  login,
  logout,
  createFeedback,
  getAllFeedback,
  deleteFeedBack,
  getFeedbackCount,
  updatePlant,
  getAllUser,
  registerUser,
  resetPassword,
  deleteUser
};

export default apiCalls;
