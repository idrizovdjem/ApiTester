import classes from './Search.module.css';

const Search = (props) => {
    const changeMethodHandler = (event) => {
        const method = event.target.value.toLowerCase();
        props.setMethod(method);
    }
    
    const changeUrlHandler = (event) => {
        const newUrl = event.target.value;
        props.setUrl(newUrl);
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