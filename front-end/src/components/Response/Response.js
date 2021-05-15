import classes from './Response.module.css';

import ResponseHeaderLine from './ResponseHeaderLine/ResponseHeaderLine';
import ResponseHeaders from './ResponseHeaders/ResponseHeaders';
import ResponseBody from './ResponseBody/ResponseBody';

const Response = () => {
    return (
        <div className={classes.Response}>
            <ResponseHeaderLine />
            <ResponseHeaders />
            <ResponseBody />
        </div>
    );
}

export default Response;