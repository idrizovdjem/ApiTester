import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from './FormUrlEncodedEditor.module.css';

import FormControll from './FormControll/FormControll';

const FormUrlEncodedEditor = () => {
    const [formControlls, setFormControlls] = useState([]);

    const addFormControllHandler = () => {
        setFormControlls(oldFormControlls => {
            return [...oldFormControlls, { key: '', value:'' }];
        });
    }

    const deleteFormHandler = (index) => {
        setFormControlls(oldFormControlls => {
            const newFormControlls = oldFormControlls.slice();
            newFormControlls.splice(index, 1);
            return newFormControlls;
        });
    }

    const updateFormControllHandler = (index, updatedFormControll) => {
        setFormControlls(oldFormControlls => {
            const newFormControlls = oldFormControlls.slice();
            newFormControlls[index] = updatedFormControll;
            return newFormControlls;
        });
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