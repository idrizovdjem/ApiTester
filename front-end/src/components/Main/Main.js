import { useState } from 'react';
import classes from './Main.module.css';

import requestsService from '../../services/requestsService';
import headersService from '../../services/headersService';

import Search from '../Search/Search';
import SectionButtonsContainer from '../SectionButtonsContainer/SectionButtonsContainer';
import Headers from '../Headers/Headers';
import Body from '../Body/Body';
import Response from '../Response/Response';

const Main = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [method, setMethod] = useState('get');
    const [url, setUrl] = useState('');
    const [headers, setHeaders] = useState([]);
    const [body, setBody] = useState({ type: 'json', value: '' });
    const [currentTab, setCurrentTab] = useState('Response');
    const [response, setResponse] = useState({
        statusCode: 0,
        statusText: '',
        headers: [],
        body: {
            type: 'text',
            value: ''
        }
    });
    const [errors, setErrors] = useState([]);

    const getCurrentTab = () => {
        switch (currentTab) {
            case 'Headers': return <Headers headers={headers} setHeaders={setHeaders} />;
            case 'Body': return <Body body={body} setBody={setBody} />;
            case 'Response': return <Response response={response} isLoading={isLoading} />
            default: return <Headers headers={headers} setHeaders={setHeaders} />;
        }
    }

    const sendRequestHandler = async () => {
        const result = requestsService.prepareRequest({ method, url, body, headers });
        if (result.ok === false) {
            setErrors(result.errorMessages);
        }

        setIsLoading(true);

        const responseObject = await requestsService.sendRequest(result.data.requestObject);
        const bodyType = headersService.getBodyType(responseObject.data.headers);

        const responseBody = {
            type: bodyType,
            value: responseObject.data.body
        };

        if(bodyType === 'none') {
            responseBody.value = '';
            responseBody.type = 'text';
        } else if (bodyType === 'json') {
            responseBody.value = JSON.stringify(responseObject.data.body)
        }

        setIsLoading(false);

        setResponse({
            statusCode: responseObject.data.statusCode,
            statusText: responseObject.data.statusText,
            headers: responseObject.data.headers,
            body: responseBody
        });

        setCurrentTab('Response');
    }

    // TODO: Implement errors visualisation

    return (
        <main className={classes.Main}>
            <Search
                method={method}
                setMethod={setMethod}
                url={url}
                setUrl={setUrl}
                sendRequest={sendRequestHandler}
            />

            <SectionButtonsContainer selectTab={setCurrentTab} currentTab={currentTab} />
            {getCurrentTab()}
        </main>
    );
}

export default Main;