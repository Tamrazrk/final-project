import axios from 'axios';
import { toast } from 'react-toastify';

// export const server = 'https://e-commerce-tech-service.onrender.com';
export const server = 'https://localhost:5000';

function onError(error) {
    toast.error(error.response?.data.message);

}

class Api {

    static async get(url, params) {
        const token = JSON.parse(localStorage.getItem("user") || '{}').token;
        
        try {
            const response = await axios.get(`${server}${url}`, {
                headers: token ? { "Authorization": `Bearer ${token}` } : {},
                params: params,
            });
            return response;

        } catch(error) {
            onError(error);
        }

    }

    static async post(url, data) {
        const token = JSON.parse(localStorage.getItem("user") || '{}').token;

        try {
            const response = await axios.post(`${server}${url}`, data, {
                headers: token ? { "Authorization": `Bearer ${token}` } : {},
                data: data,
            });

            return response;
        } catch(error) {
            onError(error);
        }
    }

    static async put(url, data) {
        const token = JSON.parse(localStorage.getItem("user") || '{}').token;

        try {
            const response = await axios.put(`${server}${url}`, data, {
                headers: token ? { "Authorization": `Bearer ${token}` } : {},
                data: data,
            });

            return response;
        } catch(error) {
            onError(error);
        }
    }

    static async delete(url) {
        const token = JSON.parse(localStorage.getItem("user") || '{}').token;

        try {
            const response = await axios.delete(`${server}${url}`, {
                headers: token ? { "Authorization": `Bearer ${token}` } : {},
            });

            return response;
        } catch(error) {
            onError(error);
        }
    }
}

export default Api;