import classes from './Response.module.css';

import ResponseHeaderLine from './ResponseHeaderLine/ResponseHeaderLine';
import ResponseHeaders from './ResponseHeaders/ResponseHeaders';
import ResponseBody from './ResponseBody/ResponseBody';

const Response = ({ response }) => {
    const { statusCode, statusText, headers, body } = response;

    return (
        <div className={classes.Response}>
            <ResponseHeaderLine statusCode={statusCode} statusText={statusText} />
            <ResponseHeaders headers={headers} />
            <ResponseBody body={body} />
        </div>
    );
}

export default Response;