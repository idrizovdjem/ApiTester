import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(request => {
    sessionStorage.setItem('request', JSON.stringify(request));
    return request;
});

export default instance;