import utilitiesService from './utilitiesService';

const allowedMethods = ['get', 'post', 'put', 'delete'];

const validateHeaderLine = (method, url) => {
    const validateResult = utilitiesService.buildValidateResult();

    if (allowedMethods.includes(method) === false) {
        utilitiesService.addErroMessage(validateResult, 'Invalid request method');
    }

    if (url === '') {
        utilitiesService.addErroMessage(validateResult, 'Destination URL cannot be empty');
    } else {
        // https://www.bing.com/search?q=swapi
        // first step - split url into (host, path)
        // second step - validate host and path

        // host - www.bing.com
        // path - /search?q=swapi

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

const prepareHeaders = (headers) => {
    const resultHeaders = [];

    for (const header of headers) {
        const { key, value } = header;

        if(isHeaderValid(key, value) && isHeaderAlreadyAdded(resultHeaders, key) === false) {
            resultHeaders.push(header);
        }
    }

    return resultHeaders;
}

const isHeaderValid = (key, value) => {
    return key !== '' && value !== '';
}

const isHeaderAlreadyAdded = (headers, key) => {
    return headers.some(header => header.key === key);
}

const addDefaultHeaders = (headers, host, body) => {
    const defaultHeaders = [
        {
            key: 'accept',
            value: '*/*'
        },
        {
            key: 'content-length',
            value: Buffer.byteLength(body.value)
        },
        {
            key: 'user-agent',
            value: 'ApiTester'
        },
        {
            key: 'host',
            value: host
        },
        {
            key: 'content-type',
            value: getContentType(body.type)
        }
    ];

    for(const defaultHeader of defaultHeaders) {
        if(isHeaderAlreadyAdded(headers, defaultHeader.key) === false) {
            headers.push(defaultHeader);
        }
    }

    return headers;
}

const getContentType = (bodyType) => {
    if(bodyType === 'json' || bodyType === 'xml') {
        return bodyType;
    } else if(bodyType === 'no body') {
        return '';
    } else if(bodyType === 'form url encoded') {
        return 'x-www-form-urlencoded';
    }
}

const attachBody = (body) => {
    const replaceRegex = /\s*/gm;
    let newBodyValue = '';

    if(body.type === 'json' || body.type === 'xml') {
        newBodyValue = body.value.replace(replaceRegex, '');
    } else if(body.type === 'form url encoded') {
        const formValues = body.value.map(form => `${escape(form.key)}=${escape(form.value)}`);
        newBodyValue = formValues.join('&');
    }

    return newBodyValue;
}

const requestsService = {
    validateHeaderLine,
    addDefaultHeaders,
    prepareHeaders,
    attachBody
};

export default requestsService;