import classes from './ResponseHeaders.module.css';

import ResponseHeaderControll from './ResponseHeaderControll/ResponseHeaderControll';

const ResponseHeaders = ({ headers }) => {
    return (
        <div className={classes.ResponseHeaders}>
            <div className={classes.ResponseHeadersLabel}>Headers</div>

            <div className={classes.ResponseHeaderTable}>
                {
                    Object.keys(headers).map((header, index) => {
                        return (
                            <ResponseHeaderControll 
                                index={index}
                                headerKey={header}
                                headerValue={headers[header]}
                                key={header}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default ResponseHeaders;