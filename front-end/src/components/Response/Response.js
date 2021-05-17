import classes from './Response.module.css';

import Spinner from '../Shared/Spinner/Spinner';

import ResponseHeaderLine from './ResponseHeaderLine/ResponseHeaderLine';
import ResponseHeaders from './ResponseHeaders/ResponseHeaders';
import ResponseBody from './ResponseBody/ResponseBody';

const Response = ({ response, isLoading }) => {
    const { statusCode, statusText, headers, body } = response;

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className={classes.Response}>
            <ResponseHeaderLine statusCode={statusCode} statusText={statusText} />
            <ResponseHeaders headers={headers} />
            <ResponseBody body={body ? body : ''} />
        </div>
    );
}

export default Response;