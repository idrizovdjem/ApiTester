import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from './Headers.module.css';

import IHeaderProps from './IHeader';
import HeaderControll from './HeaderControll/HeaderControll';

const Headers = (props: IHeaderProps) => {
    const [selectedHeaderIndex, setSelectedHeaderIndex] = useState(-1);
    const [selectedHeaderInput, setSelectedHeaderInput] = useState('');

    const addHeaderHandler = () => {
        const newHeaders = [...props.headers, { key: '', value: '' }];
        props.changeRequestProperty('headers', newHeaders);
        setSelectedElementHandler(-1, '');
    }

    const deleteHeaderHandler = (index: number) => {
        const newHeaders = props.headers.slice();
        newHeaders.splice(index, 1);
        props.changeRequestProperty('headers', newHeaders);
        setSelectedElementHandler(-1, '');
    }

    const updateHeaderHandler = (index: number, header: any) => {
        const newHeaders = props.headers.slice();
        newHeaders[index] = header;
        props.changeRequestProperty('headers', newHeaders);
    }

    const setSelectedElementHandler = (index: number, element: any) => {
        setSelectedHeaderIndex(index);
        setSelectedHeaderInput(element);
    }

    return (
        <div className={classes.Headers}>
            {
                props.headers.map((header: any, index: number) => {
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