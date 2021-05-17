import { useState } from 'react';
import classes from './ResponseHeaderControll.module.css';

const ResponseHeaderControll = (props) => {
    const [isToggled, setIsToggled] = useState(false);

    const rowColorClass = (props.index + 1) % 2 === 0 ? classes.EvenRow : classes.OddRow;
    let headerValue = props.headerValue;

    if (Array.isArray(headerValue)) {
        headerValue = headerValue.join('');
    }

    let headerValueElement;
    if (isToggled) {
        headerValueElement = (
            <div className={classes.ToggledHeaderValue}>
                {headerValue}
            </div>
        );
    } else {
        if (headerValue.length > 50) {
            headerValue = headerValue.substr(0, 50);
        }

        headerValueElement = <div className={classes.ResponseHeadersTableValue}>{headerValue}</div>;
    }

    return (
        <div
            key={props.index}
            className={`${classes.ResponseHeadersTableRow} ${rowColorClass}`}
            onClick={() => setIsToggled(oldState => !oldState)}
        >
            <div className={classes.ResponseHeadersTableName}>{props.headerKey}</div>
            {headerValueElement}
        </div>
    );
}

export default ResponseHeaderControll;