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

const Main = ({ serverStatus, setHistory, selectedRequest, changeRequestProperty, headers }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentTab, setCurrentTab] = useState('Response');
    const [errors, setErrors] = useState([]);
    const [response, setResponse] = useState({
        statusCode: 0,
        statusText: '',
        headers: [],
        body: {
            type: 'text',
            value: ''
        }
    });

    const getCurrentTab = () => {
        switch (currentTab) {
            case 'Headers': return (
                <Headers 
                    headers={headers} 
                    changeRequestProperty={changeRequestProperty} 
                />
            );
            case 'Body': return (
                <Body 
                    body={selectedRequest.body} 
                    headers={headers}
                    changeRequestProperty={changeRequestProperty} 
                />
            );
            case 'Preview': return (
                <Preview 
                    errors={errors}
                    headers={selectedRequest.headers}
                    host={selectedRequest.host}
                    path={selectedRequest.path}
                    method={selectedRequest.method}
                    body={selectedRequest.body} 
                />
            );
            case 'Response': return <Response response={response} isLoading={isLoading} />
            default: return <Headers headers={selectedRequest.headers} />;
        }
    }

    const sendRequestHandler = async () => {
        const body = selectedRequest.body;

        // validate request entries such as host and path, body and headers
        const result = requestsService.prepareRequest({ method: selectedRequest.method, url: selectedRequest.url , body, headers: selectedRequest.headers });
        if (result.ok === false) {
            setErrors(result.errorMessages);
            return;
        }

        // check if the request is not for localhost and the server is down, don't make request
        if(result.data.requestObject.isLocalHost === false && serverStatus === 'DOWN') {
            setErrors(['Can\'t make request while server is down']);
            return;
        }

        // switch tabs and show loading spinner
        setCurrentTab('Response');
        setIsLoading(true);
        
        // send request and get body type
        const requestObject = result.data.requestObject;
        requestObject.headers = headersService.prepareHeaders(headers);
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

        setResponse({
            statusCode: responseObject.data.statusCode,
            statusText: responseObject.data.statusText,
            headers: responseObject.data.headers,
            body: responseBody
        });

        setHistory(oldHistory => {
            const request = {
                url: selectedRequest.url,
                host: selectedRequest.host,
                path: selectedRequest.path,
                headers: headers,
                body: selectedRequest.body,
                method: selectedRequest.method
            };

            return [request, ...oldHistory];
        });
        
        setErrors([]);
    }

    // TODO: Implement errors visualisation

    return (
        <main className={classes.Main}>
            <Search
                headers={headers}
                method={selectedRequest.method}
                url={selectedRequest.url}
                sendRequest={sendRequestHandler}
                changeRequestProperty={changeRequestProperty}
            />

            <SectionButtonsContainer selectTab={setCurrentTab} currentTab={currentTab} />
            {getCurrentTab()}
        </main>
    );
}

export default Main;