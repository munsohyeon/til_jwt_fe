import axios from 'axios';
axios.defaults.baseURL = '/api/v1';

const path = '/order'

export const addOrder = args => {
    return axios.post(path, args).catch(e => e.response);
}

export const getOrder = () => {
    return axios.get(path).catch(e => e.response);
}

export const getOrders = orderId => {
    return axios.get(`${path}/${orderId}`).catch(e => e.response);
}