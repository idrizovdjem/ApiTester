import IRequest from '../interfaces/IRequest';
import RequestMethod from '../enums/RequestMethod';
import headersService from './headersService';
import utilitiesService from './utilitiesService';
import IHeader from '../interfaces/IHeader';

const sendRequestAsync = async (request: IRequest): Promise<void> => {
    const requestCopy: IRequest = {...request};
    const essentialHeaders: IHeader[] = headersService.getEssentialHeaders(requestCopy);
    requestCopy.headers = headersService.getHeadersUnion(requestCopy.headers, essentialHeaders);

    fetch('https://localhost:7254/api/requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestCopy)
    })
    .then((response: Response) => response.json())
    .then((data: any) => console.log(data))
    .catch((error: string) => console.log(error));
}

const getRequestForPreview = (request: IRequest): string[] => {
    const headerLine: string = getHeaderLineForPreview(request);
    const headers: string[] = headersService.getHeadersForPreview(request);

    return [headerLine, ...headers, '\n'];
};

const getHeaderLineForPreview = (request: IRequest): string => {
    const methodTypeAsString: string = RequestMethod[request.method].toLocaleUpperCase();

    const url: URL | undefined = utilitiesService.getUrl(request.url);
    const endpoint: string = url !== undefined ? url.pathname : request.url;

    return `${methodTypeAsString} ${endpoint} HTTP/1.1`;
}

export default {
    getRequestForPreview,
    sendRequestAsync
};