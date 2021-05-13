import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from './FormUrlEncodedEditor.module.css';

import FormControll from './FormControll/FormControll';

const FormUrlEncodedEditor = (props) => {
    const [formControlls, setFormControlls] = useState(props.body.value);
    const [selectedFormIndex, setSelectedFormIndex] = useState(-1);
    const [selectedFormElement, setSelectedFormElement] = useState('');

    const addFormControllHandler = () => {
        setFormControlls(oldFormControlls => {
            const newFormControlls = [...oldFormControlls, { key: '', value: '' }];
            props.updateBody(newFormControlls);
            return newFormControlls;
        });

        setSelectedFormHandler(-1, '');
    }

    const deleteFormHandler = (index) => {
        setFormControlls(oldFormControlls => {
            const newFormControlls = oldFormControlls.slice();
            newFormControlls.splice(index, 1);
            props.updateBody(newFormControlls);
            return newFormControlls;
        });

        setSelectedFormHandler(-1, '');
    }

    const updateFormControllHandler = (index, updatedFormControll) => {
        setFormControlls(oldFormControlls => {
            const newFormControlls = oldFormControlls.slice();
            newFormControlls[index] = updatedFormControll;
            props.updateBody(newFormControlls);
            return newFormControlls;
        });
    }

    const setSelectedFormHandler = (index, element) => {
        setSelectedFormIndex(index);
        setSelectedFormElement(element);
    }

    return (
        <div className={classes.FormUrlEncodedEditor}>
            {
                formControlls.map((formControll, index) => {
                    return (
                        <FormControll 
                            key={uuidv4()} 
                            index={index}
                            deleteForm={deleteFormHandler} 
                            formKey={formControll.key}
                            formValue={formControll.value}
                            isSelected={selectedFormIndex === index}
                            selectedElement={selectedFormElement}
                            setSelectedForm={setSelectedFormHandler}
                            updateFormControll={updateFormControllHandler}
                        />
                    );
                })
            }
            <button onClick={addFormControllHandler} className={classes.AddFormControllButton}>Add Form Controll</button>
        </div>
    );
}

export default FormUrlEncodedEditor;