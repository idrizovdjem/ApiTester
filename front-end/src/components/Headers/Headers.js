import classes from './Headers.module.css';

import HeaderControll from './HeaderControll/HeaderControll';

const Headers = () => {
    return (
        <div className={classes.Headers}>
            <h3 className={classes.HeadersLabel}>Headers</h3>

            <HeaderControll />
            <button className={classes.AddHeaderButton}>Add Header</button>
        </div>
    );
}

export default Headers;