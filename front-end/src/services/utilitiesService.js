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
    splitUrl
};

export default utilitiesService;