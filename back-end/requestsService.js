const axios = require('axios');

const sendRequest = async (requestObject) => {
    const config = {
        headers: requestObject.headers
    };

    const response = await axios.get(requestObject.url, requestObject.body, config);

    return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        method: response.method,
        path: response.path,
        host: response.host,
        data: response.data
    };
}

module.exports = {
    sendRequest
};