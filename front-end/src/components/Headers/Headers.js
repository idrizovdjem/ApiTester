import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from './Headers.module.css';

import HeaderControll from './HeaderControll/HeaderControll';

const Headers = ({ headers, changeRequestProperty }) => {
    const [selectedHeaderIndex, setSelectedHeaderIndex] = useState(-1);
    const [selectedHeaderInput, setSelectedHeaderInput] = useState('');

    const addHeaderHandler = () => {
        const newHeaders = [...headers, { key: '', value: '' }];
        changeRequestProperty('headers', newHeaders);
        setSelectedElementHandler(-1, '');
    }

    const deleteHeaderHandler = (index) => {
        const newHeaders = headers.slice();
        newHeaders.splice(index, 1);
        changeRequestProperty('headers', newHeaders);
        setSelectedElementHandler(-1, '');
    }

    const updateHeaderHandler = (index, header) => {
        const newHeaders = headers.slice();
        newHeaders[index] = header;
        changeRequestProperty('headers', newHeaders);
    }

    const setSelectedElementHandler = (index, element) => {
        setSelectedHeaderIndex(index);
        setSelectedHeaderInput(element);
    }

    return (
        <div className={classes.Headers}>
            {
                headers.map((header, index) => {
                    return (
                        <HeaderControll
                            deleteHeader={deleteHeaderHandler}
                            key={uuidv4()}
                            headerKey={header.key}
                            headerValue={header.value}
                            index={index}
                            isSelected={selectedHeaderIndex === index}
                            selectedInput={selectedHeaderInput}
                            updateHeader={updateHeaderHandler}
                            setSelectedElement={setSelectedElementHandler}
                        />
                    );
                })
            }
            <button onClick={addHeaderHandler} className={classes.AddHeaderButton}>Add Header</button>
        </div>
    );
}

export default Headers;