import classes from './ResponseHeaders.module.css';

const ResponseHeaders = ({ headers }) => {
    return (
        <div className={classes.ResponseHeaders}>
            <div className={classes.ResponseHeadersLabel}>Headers</div>

            <div className={classes.ResponseHeaderTable}>
                {
                    Object.keys(headers).map((header, index) => {
                        const rowColorClass = (index + 1) % 2 === 0 ? classes.EvenRow : classes.OddRow;
                        
                        let headerValue = headers[header];
                        if(Array.isArray(headerValue)) {
                            headerValue = headerValue.join('');
                        }

                        if(headerValue.length > 50) {
                            headerValue = headerValue.substr(0, 50);
                        }

                        return (
                            <div key={index} className={`${classes.ResponseHeadersTableRow} ${rowColorClass}`}>
                                <div className={classes.ResponseHeadersTableName}>{header}</div>
                                <div className={classes.ResponseHeadersTableValue}>{headerValue}</div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default ResponseHeaders;