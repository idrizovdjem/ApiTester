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

const utilitiesService = {
    buildValidateResult,
    addErroMessage,
    getServerStatus
};

export default utilitiesService;