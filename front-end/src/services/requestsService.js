import utilitiesService from './utilitiesService';
import headersService from './headersService';

import axios from '../axios';
import { ServerURL } from '../constants/RequestConstants';

const allowedMethods = ['get', 'post', 'put', 'delete'];

const validateHeaderLine = (method, url) => {
    const validateResult = utilitiesService.buildValidateResult();

    if (allowedMethods.includes(method) === false) {
        utilitiesService.addErroMessage(validateResult, 'Invalid request method');
    }

    if (url === '') {
        utilitiesService.addErroMessage(validateResult, 'Destination URL cannot be empty');
    } else {
        const urlObject = new URL(url);
        const path = urlObject.pathname + urlObject.search;
        const port = urlObject.port;
        const host = urlObject.hostname + (port ? `:${port}` : '');

        if (host === '') {
            utilitiesService.addErroMessage(validateResult, 'Invalid host');
        }

        validateResult.data = {
            path,
            host
        };
    }

    return validateResult;
}

const attachBody = (body) => {
    const replaceRegex = /\s*/gm;
    let newBodyValue = '';

    if (body.type === 'json' || body.type === 'xml') {
        newBodyValue = body.value.replace(replaceRegex, '');
        if(newBodyValue !== '') {
            newBodyValue = JSON.parse(newBodyValue);
        }
    } else if (body.type === 'form url encoded') {
        const formValues = body.value.map(form => `${escape(form.key)}=${escape(form.value)}`);
        newBodyValue = formValues.join('&');
    }

    return newBodyValue;
}

const prepareRequest = ({ method, url, body, headers }) => {
    const validationResult = utilitiesService.buildValidateResult();

    // initialize request object
    const requestObject = {
        method,
        httpVersion: 'HTTP/1.1',
        url
    };

    // validate the headers line
    const headerLineValidationResult = validateHeaderLine(method, url);
    if (headerLineValidationResult.ok === false) {
        for (const errorMessage of headerLineValidationResult.errorMessages) {
            utilitiesService.addErroMessage(validationResult, errorMessage);
        }

        return validationResult;
    }

    requestObject.path = headerLineValidationResult.data.path;
    requestObject.host = headerLineValidationResult.data.host;
    requestObject.isLocalHost = requestObject.host.includes('localhost');

    // prepare and add headers to the request object
    requestObject.headers = headersService.prepareHeaders(headers);
    if(requestObject.isLocalHost === false) {
        headersService.addDefaultHeaders(requestObject.headers, requestObject.host, body);
    }

    requestObject.body = attachBody(body, requestObject.isLocalHost);

    validationResult.data.requestObject = requestObject;
    return validationResult;
}

const sendRequest = async (requestObject) => {
    try {
        if (requestObject.isLocalHost) {
            const response = await sendLocalHostRequest(requestObject);
            return response;
        } else {
            const response = await axios.post(ServerURL, { requestObject });
            return response;
        }
    } catch (error) {
        return {
            data: {
                body: '',
                statusCode: 404,
                headers: {},
                statusText: 'NOT FOUND'
            }
        }
    }
}

const sendLocalHostRequest = async ({ method, url, body, headers }) => {
    let response;
    if(method === 'get') {
        response = await axios.get(url, { headers });
    } else if(method === 'post') {
        response = await axios.post(url, body, { headers });
    } else if(method === 'put') {
        response = await axios.put(url, body, { headers });
    } else {
        response = await axios.delete(url, { headers });
    }

    return {
        data: {
            body: response.data,
            statusCode: response.status,
            headers: response.headers,
            statusText: response.statusText
        }
    }
}

const previewRequest = (request) => {
    const requestObject = request.data.requestObject;
    const headerLine = `${requestObject.method.toUpperCase()} ${requestObject.path} ${requestObject.httpVersion}`;

    const bodyType = headersService.getBodyType(requestObject.headers);
    let previewBody = requestObject.body;
    
    if(bodyType === 'json') {
        previewBody = JSON.stringify(requestObject.body, null, 4);
    } 

    const previewHeaders = requestObject.headers;
    const contentTypeHeader = previewHeaders['content-type'];
    if(contentTypeHeader === '') {
        previewHeaders['content-type'] = 'No Body';
    }

    const requestPreview = {
        headerLine,
        headers: previewHeaders,
        body: previewBody
    };

    return requestPreview;
}

const requestsService = {
    validateHeaderLine,
    previewRequest,
    prepareRequest,
    sendRequest,
    attachBody
};

export default requestsService;