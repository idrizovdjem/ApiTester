import axios from 'axios';

import { ServerURL } from '../constants/RequestConstants';

const getServerStatus = async () => {
    try {
        const response = await axios.get(ServerURL + '/status');
        return response.data.status;
    } catch (error) {
        return 'DOWN';
    }
}

const buildValidateResult = () => {
    return {
        ok: true,
        errorMessages: [],
        data: {}
    };
}

const addErroMessage = (validateResult, message) => {
    validateResult.ok = false;
    validateResult.errorMessages.push(message);
}

const splitUrl = (url) => {
    try {
        const urlObject = new URL(url);
        const path = urlObject.pathname + urlObject.search;
        const port = urlObject.port;
        const host = urlObject.hostname + (port ? `:${port}` : '');

        return {
            path,
            host
        }
    } catch (error) {
        return {
            path: '',
            host: ''
        }
    }
}

const utilitiesService = {
    buildValidateResult,
    addErroMessage,
    getServerStatus,
    splitUrl
};

export default utilitiesService;