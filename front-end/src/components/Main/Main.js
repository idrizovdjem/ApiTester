import { useState } from 'react';
import classes from './Main.module.css';

import requestsService from '../../services/requestsService';

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
    const [errors, setErrors] = useState([]);

    const getCurrentTab = () => {
        switch(currentTab) {
            case 'Headers': return <Headers headers={headers} setHeaders={setHeaders} />;
            case 'Body': return <Body body={body} setBody={setBody} />;
            case 'Response': return <Response />
            default: return <Headers headers={headers} setHeaders={setHeaders} />;
        }
    }

    const sendRequestHandler = async () => {
        const result = requestsService.prepareRequest({ method, url, body, headers });
        if(result.ok === false) {
            setErrors(result.errorMessages);
        }

        // TODO: MAKE REQUEST
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