import RequestMethod from "../enums/RequestMethod";
import IBody from "./IBody";
import IHeader from "./IHeader";

export default interface IRequest {
    [index: string]: any;
    method: RequestMethod;
    url: string;
    host: string;
    path: string;
    headers: IHeader[];
    body: IBody;

};

// responseObject: {
//     statusCode: 0,
//     statusText: '',
//     headers: [],
//     body: {
//         type: 'text',
//         value: ''
//     }
// }