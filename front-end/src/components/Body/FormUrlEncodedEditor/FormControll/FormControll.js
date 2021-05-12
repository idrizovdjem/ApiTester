import classes from './FormControll.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

const FormControll = () => {
    return (
        <div className={classes.FormControll}>
            <input
                className={classes.FormKeyValueInput}
                placeholder='Form Key'
            />

            <input
                className={classes.FormValueInput}
                placeholder='Form Value'
            />

            <FontAwesomeIcon
                icon={faSave}
                className={classes.FormIcon}
            />

            <FontAwesomeIcon
                icon={faTrash}
                className={classes.FormIcon}
            />
        </div>
    );
}

export default FormControll;