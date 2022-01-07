import { useState } from 'react';
import classes from './Main.module.css';

import requestsService from '../../services/requestsService';
import headersService from '../../services/headersService';

import Search from '../Search/Search';
import SectionButtonsContainer from '../SectionButtonsContainer/SectionButtonsContainer';
import Headers from '../Headers/Headers';
import Body from '../Body/Body';
import Response from '../Response/Response';
import Preview from '../Preview/Preview';
import IMainProps from './IMainProps';

const Main = (props: IMainProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentTab, setCurrentTab] = useState('Response');
    const [errors, setErrors] = useState([]);

    const getCurrentTab = () => {
        switch (currentTab) {
            case 'Headers': return (
                <Headers 
                    headers={props.headers} 
                    changeRequestProperty={props.changeRequestProperty} 
                />
            );
            case 'Body': return (
                <Body 
                    body={props.selectedRequest.body} 
                    headers={props.headers}
                    changeRequestProperty={props.changeRequestProperty} 
                />
            );
            case 'Preview': return (
                <Preview 
                    errors={errors}
                    headers={props.selectedRequest.headers}
                    host={props.selectedRequest.host}
                    path={props.selectedRequest.path}
                    method={props.selectedRequest.method}
                    body={props.selectedRequest.body} 
                />
            );
            case 'Response': return <Response response={props.selectedRequest.responseObject} isLoading={isLoading} />
            default: return (
                <Headers 
                    headers={props.selectedRequest.headers}
                    changeRequestProperty={props.changeRequestProperty}
                />
            );
        }
    }

    const sendRequestHandler = async () => {
        const body = props.selectedRequest.body;

        // validate request entries such as host and path, body and headers
        const result = requestsService.prepareRequest({ method: props.selectedRequest.method, url: props.selectedRequest.url , body, headers: props.selectedRequest.headers });
        if (result.ok === false) {
            setErrors(result.errorMessages);
            return;
        }
        
        // switch tabs and show loading spinner
        setCurrentTab('Response');
        setIsLoading(true);
        
        // send request and get body type
        const requestObject = (result.data as any).requestObject;
        requestObject.headers = headersService.prepareHeaders(props.headers);
        const responseObject = await requestsService.sendRequest(requestObject);
        const bodyType = headersService.getBodyType(responseObject.data.headers);

        const responseBody = {
            type: bodyType,
            value: responseObject.data.body
        };

        if(bodyType === 'none') {
            responseBody.value = '';
            responseBody.type = 'text';
        } else if (bodyType === 'json') {
            responseBody.value = JSON.stringify(responseObject.data.body, null, 4);
        }

        setIsLoading(false);

        const currentResponse = {
            statusCode: responseObject.data.statusCode,
            statusText: responseObject.data.statusText,
            headers: responseObject.data.headers,
            body: responseBody
        };

        props.changeRequestProperty('responseObject', currentResponse);

        props.setHistory((oldHistory: any) => {
            const request = {
                url: props.selectedRequest.url,
                host: props.selectedRequest.host,
                path: props.selectedRequest.path,
                headers: props.headers,
                body: props.selectedRequest.body,
                method: props.selectedRequest.method,
                responseObject: currentResponse
            };

            return [request, ...oldHistory];
        });
        
        setErrors([]);
    }

    return (
        <main className={classes.Main}>
            <Search
                headers={props.headers}
                method={props.selectedRequest.method}
                url={props.selectedRequest.url}
                sendRequest={sendRequestHandler}
                changeRequestProperty={props.changeRequestProperty}
            />

            <SectionButtonsContainer selectTab={setCurrentTab} currentTab={currentTab} />
            {getCurrentTab()}
        </main>
    );
}

export default Main;