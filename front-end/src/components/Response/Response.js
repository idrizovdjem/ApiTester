import classes from './Response.module.css';

import ResponseHeaderLine from './ResponseHeaderLine/ResponseHeaderLine';

const Response = () => {
    return (
        <div className={classes.Response}>
            <ResponseHeaderLine />
        </div>
    );
}

export default Response;