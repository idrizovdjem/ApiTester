import { createContext } from 'react';
import DefaultRequest from '../defaultObjects/DefaultRequest';
import IRequest from '../interfaces/IRequest';

interface IRequestContext {
    request: IRequest,
    setRequestProperty: (key: string, value: any) => void;
};

const defaultObject: IRequestContext = {
    request: DefaultRequest,
    setRequestProperty: (key: string, value: any): void => {}
};

const RequestContext = createContext(defaultObject);
export default RequestContext;