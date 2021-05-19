import classes from './Search.module.css';

import utilitiesService from '../../services/utilitiesService';

const Search = (props) => {
    const changeMethodHandler = (event) => {
        const method = event.target.value.toLowerCase();
        props.setMethod(method);
    }
    
    const changeUrlHandler = (event) => {
        const newUrl = event.target.value;
        const { host, path } = utilitiesService.splitUrl(newUrl);

        props.setUrl(newUrl);
        props.setHost(host);
        props.setPath(path);

        props.setHeaders(oldHeaders => {
            const newHeaders = oldHeaders.slice(); 
            const hostHeader = newHeaders.find(header => header.key === 'host');
            
            if(host === '') {
                // invalid host
                if(hostHeader === undefined) {
                    return newHeaders;
                }

                const index = newHeaders.indexOf(hostHeader);
                newHeaders.splice(index, 1);
                return newHeaders;
            }

            if(hostHeader === undefined) {
                newHeaders.push({ key: 'host', value: host });
            } else {
                hostHeader.value = host;
            }

            return newHeaders;
        });
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