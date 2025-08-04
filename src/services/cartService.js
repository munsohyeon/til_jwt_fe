import axios from 'axios';
axios.defaults.baseURL = '/api/v1';

const path = '/cart'

// json
export const addItem = itemId => {
    return axios.post(path, { itemId }).catch(e => e.response);
}

export const getItems = () => {
    return axios.get(path).catch(e => e.response);
}

// Query String
export const removeItem = cartId => {
    return axios.delete(`${path}/${cartId}`).catch(e => e.response);
}

export const removeItemAll = () => {
    return axios.delete(path).catch(e => e.response);
}