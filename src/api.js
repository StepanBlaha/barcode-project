import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchData = async () => {
    const response = await axios.get(`${API_BASE_URL}/data`);
    return response.data;
};

export const postData = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/data`, data);
    return response.data;
};
