import IRequest from "../../interfaces/IRequest";

export default interface IMainProps {
    setHistory: any;
    selectedRequest: IRequest; 
    changeRequestProperty: (key: string, value: any) => void; 
    headers: any[];
};