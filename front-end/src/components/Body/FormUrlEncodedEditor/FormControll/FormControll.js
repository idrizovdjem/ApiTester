import { useState } from 'react';
import classes from './FormControll.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

const FormControll = (props) => {
    const [formKey, setFormKey] = useState(props.formKey);
    const [formValue, setFormValue] = useState(props.formValue);
    const [isSaved, setIsSaved] = useState(true);

    const changeFormKeyHandler = (event) => {
        const newFormKey = event.target.value;
        setFormKey(newFormKey);
        setIsSaved(false);
    }

    const changeFormValueHandler = (event) => {
        const newFormValue = event.target.value;
        setFormValue(newFormValue);
        setIsSaved(false);
    }

    const saveChangesHandler = () => {
        props.updateFormControll(props.index, { key: formKey, value: formValue });
        setIsSaved(true);
    }

    return (
        <div className={classes.FormControll}>
            <input
                className={classes.FormKeyValueInput}
                placeholder='Form Key'
                value={formKey}
                onChange={changeFormKeyHandler}
            />

            <input
                className={classes.FormValueInput}
                placeholder='Form Value'
                value={formValue}
                onChange={changeFormValueHandler}
            />

            <FontAwesomeIcon
                style={{ color: isSaved ? 'darkslategrey' : 'aliceblue' }}
                icon={faSave}
                className={classes.FormIcon}
                onClick={saveChangesHandler}
            />

            <FontAwesomeIcon
                icon={faTrash}
                className={classes.FormIcon}
                onClick={() => props.deleteForm(props.index)}
            />
        </div>
    );
}

export default FormControll;