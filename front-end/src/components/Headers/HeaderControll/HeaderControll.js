import { useState, useRef, useEffect } from 'react';
import classes from './HeaderControll.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const HeaderControll = (props) => {
    const [headerKey, setHeaderKey] = useState(props.headerKey);
    const [headerValue, setHeaderValue] = useState(props.headerValue);
    const headerKeyInput = useRef();
    const headerValueInput = useRef();

    useEffect(() => {
        if(props.isSelected) {
            if(props.selectedInput === 'key') {
                headerKeyInput.current.focus();
            } else if(props.selectedInput === 'value') {
                headerValueInput.current.focus();
            }
        }
    }, [props]);

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
                onFocus={() => props.setSelectedElement(props.index, 'key')}
                ref={headerKeyInput}
            />

            <input
                className={classes.HeaderValueInput}
                placeholder='Header Value'
                value={headerValue}
                onChange={changeHeaderValueHandler}
                onFocus={() => props.setSelectedElement(props.index, 'value')}
                ref={headerValueInput}
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