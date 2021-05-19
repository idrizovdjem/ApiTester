import classes from './Preview.module.css';

import Alert from '../Shared/Alert/Alert';

const Preview = (props) => {
    const alerts = props.errors.map(message => {
        return <Alert message={message} severity='error' />
    });

    if (alerts.length > 0) {
        return (
            <div className={classes.Preview}>
                {alerts}
            </div>
        );
    }
 
    const headerLine = `${props.method.toUpperCase()} ${props.url} HTTP/1.1`;
    let requestBody = props.body.value;

    // if the body type is form url encoded(body value is object) the body should be converted to string
    if(typeof requestBody !== 'string') {
        requestBody = Object.keys(requestBody).map(form => {
            const formKey = escape(requestBody[form].key);
            const formValue = escape(requestBody[form].value);

            return `${formKey}=${formValue}`;
        });

        requestBody = requestBody.join('&');
    }

    return (
        <div className={classes.Preview}>
            <div className={classes.HeaderLine}>{headerLine}</div>

            <div className={classes.Headers}>
                {
                    props.headers.map(header => {
                        return (
                            <div className={classes.Header}>
                                <h3 className={classes.HeaderKeys}>{header.key}</h3>
                                <h3 className={classes.HeaderValues}>{header.value}</h3>
                            </div>
                        );
                    })
                }
            </div>

        <div className={classes.Body}>
                {requestBody}
            </div>
        </div>
    );
}

export default Preview;