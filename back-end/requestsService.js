const fetch = require('node-fetch');

const sendRequest = async (requestObject) => {
    const config = {
        method: requestObject.method,
        headers: requestObject.headers,
        body: requestObject.method === 'get' ? null : requestObject.body
    };

    const responseObject = {
        statusCode: 0,
        statusText: '',
        headers: {},
        body: {}
    };

    await fetch(requestObject.url, { headers: config.headers })
        .then(response => {
            // determine body type
            const contentType = response.headers.get('content-type');
            const bodyType = determineBodyType(contentType);

            // get all headers from the response
            const iterator = response.headers.keys();
            while (true) {
                const keyName = iterator.next().value;
                if (keyName === undefined) {
                    break;
                }

                responseObject.headers[keyName] = response.headers.get(keyName);
            }

            responseObject.statusCode = response.status;
            responseObject.statusText = response.statusText;

            // parse the response body
            if (bodyType === 'json') {
                return response.json();
            } else {
                return response.text();
            }
        })
        .then(data => {
            responseObject.body = data;
        })
        .catch(error => {
            responseObject.statusCode = 404;
            responseObject.statusText = 'NOT FOUND';
            responseObject.headers = {};
        });

    return responseObject;
}

const determineBodyType = (contentType) => {
    const contentTypeHeader = contentType?.split('; ')[0];

    switch (contentTypeHeader) {
        case 'text/html': return 'html';
        case 'application/json': return 'json';
        case 'text/plain': return 'text';
        default: return 'html';
    }
}

module.exports = {
    sendRequest
};