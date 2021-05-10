import classes from './Search.module.css';

const Search = () => {
    return (
        <div className={classes.Search}>
            <select className={classes.SearchMethod}>
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
            </select>

            <input className={classes.SearchField} spellCheck={false} />

            <button className={classes.GoButton}>Go</button>
        </div>
    );
}

export default Search;