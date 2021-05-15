import classes from './ResponseHeaderLine.module.css';

const ResponseHeaderLine = ({ statusCode, statusText }) => {
    return (
        <div className={classes.ResponseStatus}>
            <div className={classes.ResponseStatusLabel}>Response Status: </div>
            <div className={classes.ResponseStatusCode}>{statusCode}</div>
            <div>{statusText}</div>
        </div>
    );
}

export default ResponseHeaderLine;