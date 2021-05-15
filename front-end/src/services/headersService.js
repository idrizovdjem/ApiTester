const prepareHeaders = (headers) => {
    const resultHeaders = {};

    for (const header of headers) {
        const { key, value } = header;

        if(isHeaderValid(key, value) && isHeaderAlreadyAdded(resultHeaders, key) === false) {
            resultHeaders[key] = value.toString();
        }
    }

    return resultHeaders;
}

const isHeaderValid = (key, value) => {
    return key !== '' && value !== '';
}

const isHeaderAlreadyAdded = (headers, key) => {
    return Object.hasOwnProperty(key);
}

const addDefaultHeaders = (headers, host, body) => {
    const defaultHeaders = [
        {
            key: 'accept',
            value: '*/*'
        },
        {
            key: 'content-length',
            value: Buffer.byteLength(body.value).toString()
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
            headers[defaultHeader.key] = defaultHeader.value;
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

const getBodyType = (headers) => {
    // TODO: Implement
}

const headersService = {
    getBodyType,
    prepareHeaders,
    addDefaultHeaders
};

export default headersService;