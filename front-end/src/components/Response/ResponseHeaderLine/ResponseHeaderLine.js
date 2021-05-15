import classes from './ResponseHeaderLine.module.css';

const ResponseHeaderLine = () => {
    return (
        <div className={classes.ResponseStatus}>
            <div className={classes.ResponseStatusLabel}>Response Status: </div>
            <div className={classes.ResponseStatusCode}>200</div>
            <div>OK</div>
        </div>
    );
}

export default ResponseHeaderLine;