import { useState } from 'react';
import classes from './HeaderControll.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

const HeaderControll = (props) => {
    const [headerKey, setHeaderKey] = useState(props.headerKey);
    const [headerValue, setHeaderValue] = useState(props.headerValue);
    const [isSaved, setIsSaved] = useState(true);

    const changeHeaderKeyHandler = (event) => {
        const newHeaderKey = event.target.value;
        setHeaderKey(newHeaderKey);
        setIsSaved(false);
    }

    const changeHeaderValueHandler = (event) => {
        const newHeaderValue = event.target.value;
        setHeaderValue(newHeaderValue);
        setIsSaved(false);
    }

    const saveHeaderChangesHandler = () => {
        props.updateHeader(props.index, { key: headerKey, value: headerValue });
        setIsSaved(true);
    }

    return (
        <div className={classes.HeaderControll}>
            <input
                className={classes.HeaderKeyInput}
                placeholder='Header Key'
                value={headerKey}
                onChange={changeHeaderKeyHandler}
            />

            <input
                className={classes.HeaderValueInput}
                placeholder='Header Value'
                value={headerValue}
                onChange={changeHeaderValueHandler}
            />

            <FontAwesomeIcon
                style={{ color: isSaved ? 'darkslategrey' : 'aliceblue' }}
                onClick={saveHeaderChangesHandler}
                icon={faSave}
                className={classes.HeaderIcon}
            />

            <FontAwesomeIcon
                onClick={() => props.deleteHeader(props.index)}
                icon={faTrash}
                className={classes.HeaderIcon}
            />
        </div>
    );
}

export default HeaderControll;