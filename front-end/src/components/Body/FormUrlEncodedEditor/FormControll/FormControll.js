import { useState, useEffect, useRef } from 'react';
import classes from './FormControll.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const FormControll = (props) => {
    const [formKey, setFormKey] = useState(props.formKey);
    const [formValue, setFormValue] = useState(props.formValue);
    const formKeyInput = useRef();
    const formValueInput = useRef();

    useEffect(() => {
        if(props.isSelected) {
            if(props.selectedElement === 'key') {
                formKeyInput.current.focus();
            } else if(props.selectedElement === 'value') {
                formValueInput.current.focus();
            }
        }
    }, [props]);

    const changeFormKeyHandler = (event) => {
        const newFormKey = event.target.value;
        setFormKey(newFormKey);
        props.updateFormControll(props.index, { key: newFormKey, value: formValue });
    }

    const changeFormValueHandler = (event) => {
        const newFormValue = event.target.value;
        setFormValue(newFormValue);
        props.updateFormControll(props.index, { key: formKey, value: newFormValue });
    }

    return (
        <div className={classes.FormControll}>
            <input
                className={classes.FormKeyValueInput}
                placeholder='Form Key'
                value={formKey}
                onChange={changeFormKeyHandler}
                onFocus={() => props.setSelectedForm(props.index, 'key')}
                ref={formKeyInput}
            />

            <input
                className={classes.FormValueInput}
                placeholder='Form Value'
                value={formValue}
                onChange={changeFormValueHandler}
                onFocus={() => props.setSelectedForm(props.index, 'value')}
                ref={formValueInput}
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