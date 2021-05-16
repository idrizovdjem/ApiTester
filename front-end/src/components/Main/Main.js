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
            type: '',
            value: ''
        }
    });
    const [errors, setErrors] = useState([]);

    const getCurrentTab = () => {
        switch(currentTab) {
            case 'Headers': return <Headers headers={headers} setHeaders={setHeaders} />;
            case 'Body': return <Body body={body} setBody={setBody} />;
            case 'Response': return <Response response={response} />
            default: return <Headers headers={headers} setHeaders={setHeaders} />;
        }
    }

    const sendRequestHandler = async () => {
        const result = requestsService.prepareRequest({ method, url, body, headers });
        if(result.ok === false) {
            setErrors(result.errorMessages);
        }

        const responseObject = await requestsService.sendRequest(result.data.requestObject);
        const bodyType = headersService.getBodyType(responseObject.data.headers);

        setResponse({
            statusCode: responseObject.statusCode,
            statusText: responseObject.statusText,
            headers: response.headers,
            body: {
                type: bodyType,
                value: responseObject.data.body
            }
        });
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

            <SectionButtonsContainer selectTab={setCurrentTab} />
            {getCurrentTab()}
        </main>
    );
}

export default Main;