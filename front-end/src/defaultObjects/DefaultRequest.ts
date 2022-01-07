import BodyType from "../enums/BodyType";
import RequestMethod from "../enums/RequestMethod";
import IRequest from "../interfaces/IRequest";

const defaultRequest: IRequest = {
    method: RequestMethod.Get,
    url: '',
    host: '',
    path: '',
    headers: [],
    body: { type: BodyType.NoBody, value: '' }
};

export default { ...defaultRequest };