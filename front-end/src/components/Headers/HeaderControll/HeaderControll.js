import { useState } from 'react';
import classes from './HeaderControll.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const HeaderControll = (props) => {
    const [headerKey, setHeaderKey] = useState(props.headerKey);
    const [headerValue, setHeaderValue] = useState(props.headerValue);

    const changeHeaderKeyHandler = (event) => {
        const newHeaderKey = event.target.value;
        setHeaderKey(newHeaderKey);
        props.updateHeader(props.index, { key: newHeaderKey, value: headerValue });
    }

    const changeHeaderValueHandler = (event) => {
        const newHeaderValue = event.target.value;
        setHeaderValue(newHeaderValue);
        props.updateHeader(props.index, { key: headerKey, value: newHeaderValue });
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
                onClick={() => props.deleteHeader(props.index)}
                icon={faTrash}
                className={classes.HeaderDeleteIcon}
            />
        </div>
    );
}

export default HeaderControll;