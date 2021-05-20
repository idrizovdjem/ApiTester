import classes from './Search.module.css';

import utilitiesService from '../../services/utilitiesService';

const Search = (props) => {
    const changeMethodHandler = (event) => {
        const method = event.target.value.toLowerCase();
        props.changeRequestProperty('method', method);
    }

    const changeUrlHandler = (event) => {
        const newUrl = event.target.value;
        const { host, path } = utilitiesService.splitUrl(newUrl);

        props.changeRequestProperty('url', newUrl);
        props.changeRequestProperty('host', host);
        props.changeRequestProperty('path', path);
        changeHeaderHost(props.headers, host);
    }

    const changeHeaderHost = (headers, host) => {
        const newHeaders = headers.slice();
        const hostHeader = newHeaders.find(header => header.key === 'host');

        if (host === '') {
            // invalid host
            if (hostHeader === undefined) {
                props.changeRequestProperty('headers', newHeaders);
            }

            const index = newHeaders.indexOf(hostHeader);
            newHeaders.splice(index, 1);
            props.changeRequestProperty('headers', newHeaders);
        }

        if (hostHeader === undefined) {
            newHeaders.push({ key: 'host', value: host });
        } else {
            hostHeader.value = host;
        }

        props.changeRequestProperty('headers', newHeaders);
    }

    return (
        <div className={classes.Search}>
            <select
                onChange={changeMethodHandler}
                value={props.method}
                className={classes.SearchMethod}
            >
                <option value='get'>GET</option>
                <option value='post'>POST</option>
                <option value='put'>PUT</option>
                <option value='delete'>DELETE</option>
            </select>

            <input
                onChange={changeUrlHandler}
                value={props.url}
                className={classes.SearchField}
                spellCheck={false}
            />

            <button
                className={classes.GoButton}
                onClick={props.sendRequest}
            >Send</button>
        </div>
    );
}

export default Search;