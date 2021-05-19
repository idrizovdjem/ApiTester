import classes from './Preview.module.css';

import requestsService from '../../services/requestsService';

import Alert from '../Shared/Alert/Alert';

const Preview = ({ errors }) => {
    const request = JSON.parse(sessionStorage.getItem('request'));
    const requestPreview = requestsService.previewRequest(request);

    const alerts = errors.map(message => {
        return <Alert message={message} severity='error' />
    });

    if (alerts.length > 0) {
        return (
            <div className={classes.Preview}>
                {alerts}
            </div>
        );
    }

    return (
        <div className={classes.Preview}>
            <div className={classes.HeaderLine}>{requestPreview.headerLine}</div>

            <div className={classes.Headers}>
                {
                    Object.keys(requestPreview.headers).map(headerKey => {
                        return (
                            <div className={classes.Header}>
                                <h3 className={classes.HeaderKeys}>{headerKey}</h3>
                                <h3 className={classes.HeaderValues}>{requestPreview.headers[headerKey]}</h3>
                            </div>
                        );
                    })
                }
            </div>

            <div className={classes.Body}>
                {requestPreview.body}
            </div>
        </div>
    );
}

export default Preview;