import classes from './ResponseHeaderControll.module.css';

const ResponseHeaderControll = (props) => {
    const rowColorClass = (props.index + 1) % 2 === 0 ? classes.EvenRow : classes.OddRow;

    let headerValue = props.headerValue;

    if(Array.isArray(headerValue)) {
        headerValue = headerValue.join('');
    }

    if(headerValue.length > 50) {
        headerValue = headerValue.substr(0, 50);
    }

    return (
        <div key={props.index} className={`${classes.ResponseHeadersTableRow} ${rowColorClass}`}>
            <div className={classes.ResponseHeadersTableName}>{props.headerKey}</div>
            <div className={classes.ResponseHeadersTableValue}>{headerValue}</div>
        </div>
    );
}

export default ResponseHeaderControll;