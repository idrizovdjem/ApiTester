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
 
    const headerLine = `${props.method.toUpperCase()} ${props.path} HTTP/1.1`;
    let requestBody = props.body.value;

    if(props.body.type === 'application/x-www-form-urlencoded') {
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