import classes from './ResponseHeaders.module.css';

const ResponseHeaders = ({ headers }) => {
    return (
        <div className={classes.ResponseHeaders}>
            <div className={classes.ResponseHeadersLabel}>Headers</div>

            <div className={classes.ResponseHeaderTable}>
                {
                    headers.map((header, index) => {
                        const rowColorClass = (index + 1) % 2 === 0 ? classes.EvenRow : classes.OddRow;
                        
                        return (
                            <div key={index} className={`${classes.ResponseHeadersTableRow} ${rowColorClass}`}>
                                <div className={classes.ResponseHeadersTableName}>{header.key}</div>
                                <div className={classes.ResponseHeadersTableValue}>{header.value}</div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default ResponseHeaders;