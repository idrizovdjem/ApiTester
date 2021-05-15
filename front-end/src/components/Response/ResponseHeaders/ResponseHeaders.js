import classes from './ResponseHeaders.module.css';

const ResponseHeaders = () => {
    return (
        <div className={classes.ResponseHeaders}>
            <div className={classes.ResponseHeadersLabel}>Headers</div>
            
            <div className={classes.ResponseHeaderTable}>
                <div className={`${classes.ResponseHeadersTableRow} ${classes.OddRow}`}>
                    <div className={classes.ResponseHeadersTableName}>Name</div>
                    <div className={classes.ResponseHeadersTableValue}>Value</div>
                </div>

                <div className={`${classes.ResponseHeadersTableRow} ${classes.EvenRow}`}>
                    <div className={classes.ResponseHeadersTableName}>Name</div>
                    <div className={classes.ResponseHeadersTableValue}>Value</div>
                </div>

                <div className={`${classes.ResponseHeadersTableRow} ${classes.OddRow}`}>
                    <div className={classes.ResponseHeadersTableName}>Name</div>
                    <div className={classes.ResponseHeadersTableValue}>Value</div>
                </div>

                <div className={`${classes.ResponseHeadersTableRow} ${classes.EvenRow}`}>
                    <div className={classes.ResponseHeadersTableName}>Name</div>
                    <div className={classes.ResponseHeadersTableValue}>Value</div>
                </div>

                <div className={`${classes.ResponseHeadersTableRow} ${classes.OddRow}`}>
                    <div className={classes.ResponseHeadersTableName}>Name</div>
                    <div className={classes.ResponseHeadersTableValue}>Value</div>
                </div>

                <div className={`${classes.ResponseHeadersTableRow} ${classes.EvenRow}`}>
                    <div className={classes.ResponseHeadersTableName}>Name</div>
                    <div className={classes.ResponseHeadersTableValue}>Value</div>
                </div>

                <div className={`${classes.ResponseHeadersTableRow} ${classes.OddRow}`}>
                    <div className={classes.ResponseHeadersTableName}>Name</div>
                    <div className={classes.ResponseHeadersTableValue}>Value</div>
                </div>

                <div className={`${classes.ResponseHeadersTableRow} ${classes.EvenRow}`}>
                    <div className={classes.ResponseHeadersTableName}>Name</div>
                    <div className={classes.ResponseHeadersTableValue}>Value</div>
                </div>
            </div>
        </div>
    );
}

export default ResponseHeaders;