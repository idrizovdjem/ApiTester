import BodyType from "../enums/BodyType";
import IHeader from "../interfaces/IHeader";
import IRequest from "../interfaces/IRequest";
import utilitiesService from "./utilitiesService";

const getEssentialHeaders = (request: IRequest): IHeader[] => {
    const essentialHeaders: IHeader[] = [];

    const urlObject: URL | undefined = utilitiesService.getUrl(request.url);
    if (urlObject !== undefined) {
        essentialHeaders.push({ key: 'Host', value: urlObject.host });
    }

    const contentType: string = getContentType(request.body.type);
    if (contentType !== '') {
        essentialHeaders.push({ key: 'Content-Type', value: contentType });

        const contentLength: number = new Blob([request.body.value]).size;
        essentialHeaders.push({ key: 'Content-Length', value: contentLength.toString() });
    }

    essentialHeaders.push({ key: 'Accept', value: '*/*' });
    return essentialHeaders;
}

const getContentType = (bodyType: BodyType): string => {
    switch (bodyType) {
        case BodyType.Json: return 'application/json';
        case BodyType.Xml: return 'application/xhtml+xml';
        case BodyType.NoBody: return '';
    }
}

const getHeadersForPreview = (request: IRequest): string[] => {
    const essentialHeaders: IHeader[] = getEssentialHeaders(request);
    const headersUnion: IHeader[] = getHeadersUnion(request.headers, essentialHeaders);
    return mapHeadersToStrings(headersUnion);
}

const mapHeadersToStrings = (headers: IHeader[]): string[] => {
    return headers.map((header: IHeader) => {
        return `${header.key}: ${header.value}`;
    });
}

const getHeadersUnion = (headers: IHeader[], additionalHeaders: IHeader[]): IHeader[] => {
    const filteredAdditionalHeaders: IHeader[] = additionalHeaders.filter((header: IHeader) => {
        const headerIndex: number = headers.findIndex(h => h.key === header.key);
        return headerIndex === -1;
    });

    return [...headers, ...filteredAdditionalHeaders];
}

export default {
    getEssentialHeaders,
    getHeadersForPreview,
    getHeadersUnion
};