import utilitiesService from './utilitiesService';
import headersService from './headersService';

import axios from 'axios';
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

    // prepare and add headers to the request object
    requestObject.headers = headersService.prepareHeaders(headers);
    headersService.addDefaultHeaders(requestObject.headers, requestObject.host, body);

    requestObject.body = attachBody(body);

    validationResult.data.requestObject = requestObject;
    return validationResult;
}

const sendRequest = async (requestObject) => {
    const response = await axios.post(ServerURL, { requestObject });
    return response;
}

const requestsService = {
    validateHeaderLine,
    prepareRequest,
    sendRequest,
    attachBody
};

export default requestsService;