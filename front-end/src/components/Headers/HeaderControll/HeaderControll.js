import classes from './HeaderControll.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const HeaderControll = () => {
    return (
        <div className={classes.HeaderControll}>
            <input className={classes.HeaderKeyInput} placeholder='Header Key' />
            <input className={classes.HeaderValueInput} placeholder='Header Value' />
            <FontAwesomeIcon icon={faTrash} className={classes.HeaderDeleteIcon} />
        </div>
    );
}

export default HeaderControll;