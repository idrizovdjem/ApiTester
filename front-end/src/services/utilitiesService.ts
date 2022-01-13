const getUrl = (url: string): URL | undefined => {
    try {
        const urlObject: URL = new URL(url);
        return urlObject;
    } catch {
        return undefined;
    }
};

export default {
    getUrl
};