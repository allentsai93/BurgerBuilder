import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://authentication-ec0b0.firebaseio.com/'
});

export default instance;