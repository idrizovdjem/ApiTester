import { v4 as uuidv4 } from 'uuid';
import classes from './Headers.module.css';

import HeaderControll from './HeaderControll/HeaderControll';

const Headers = ({ headers, setHeaders }) => {
    const addHeaderHandler = () => {
        setHeaders(oldHeaders => {
            const newHeaders = [...oldHeaders, { key: '', value: '' }];
            return newHeaders;
        });
    }

    const deleteHeaderHandler = (index) => {
        setHeaders(oldHeaders => {
            const newHeaders = oldHeaders.slice();
            newHeaders.splice(index, 1);
            return newHeaders;
        });
    }

    const updateHeaderHandler = (index, header) => {
        setHeaders(oldHeaders => {
            const newHeaders = oldHeaders.slice();
            newHeaders[index] = header;
            return newHeaders;
        });
    }

    return (
        <div className={classes.Headers}>
            <h3 className={classes.HeadersLabel}>Headers</h3>
            {
                headers.map((header, index) => {
                    return (
                        <HeaderControll
                            deleteHeader={deleteHeaderHandler}
                            key={uuidv4()}
                            headerKey={header.key}
                            headerValue={header.value}
                            index={index}
                            updateHeader={updateHeaderHandler}
                        />
                    );
                })
            }
            <button onClick={addHeaderHandler} className={classes.AddHeaderButton}>Add Header</button>
        </div>
    );
}

export default Headers;