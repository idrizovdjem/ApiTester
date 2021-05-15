import { useState } from 'react';
import axios from 'axios';
import classes from './Main.module.css';

import requestsService from '../../services/requestsService';
import { ServerURL } from '../../constants/RequestConstants';

import Search from '../Search/Search';
import SectionButtonsContainer from '../SectionButtonsContainer/SectionButtonsContainer';
import Headers from '../Headers/Headers';
import Body from '../Body/Body';

const Main = () => {
    const [method, setMethod] = useState('get');
    const [url, setUrl] = useState('');
    const [headers, setHeaders] = useState([]);
    const [body, setBody] = useState({ type: 'json', value: '' });
    const [currentTab, setCurrentTab] = useState('Body');
    const [errors, setErrors] = useState([]);

    const getCurrentTab = () => {
        switch(currentTab) {
            case 'Headers': return <Headers headers={headers} setHeaders={setHeaders} />
            case 'Body': return <Body body={body} setBody={setBody} />
            default: return <Headers headers={headers} setHeaders={setHeaders} />
        }
    }

    const sendRequestHandler = async () => {
        const requestObject = {
            method,
            httpVersion: 'HTTP/1.1',
            url
        };

        const headerLineValidationResult = requestsService.validateHeaderLine(method, url);
        if(headerLineValidationResult.ok === false) {
            setErrors(headerLineValidationResult.errorMessages);
            return;
        }

        requestObject.path = headerLineValidationResult.data.path;
        requestObject.host = headerLineValidationResult.data.host;

        requestObject.headers = requestsService.prepareHeaders(headers);
        requestsService.addDefaultHeaders(requestObject.headers, requestObject.host, body);
        
        requestObject.body = requestsService.attachBody(body);

        const response = await axios.post(ServerURL, { requestObject });

        // fetch('https://apple-viridian-trilby.glitch.me/', {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ requestObject })
        // })
        // .then(response => {
        //     responseObject.response = response;
        //     return response.json();
        // })
        // .then(data => {
        //     responseObject.data = data;
        //     console.log(responseObject);
        // })
        // .catch(error => {
        //     responseObject.error = error;
        //     console.log(responseObject);
        // });

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