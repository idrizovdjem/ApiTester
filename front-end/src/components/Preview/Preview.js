import classes from './Preview.module.css';

import Alert from '../Shared/Alert/Alert';

const Preview = ({ errors }) => {
    return (
        <div className={classes.Preview}>
            {
                errors.map(message => {
                    return <Alert message={message} severity='error' />
                })
            }
        </div>
    );
}

export default Preview;