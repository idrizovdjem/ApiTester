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
    addErroMessage
};

export default utilitiesService;