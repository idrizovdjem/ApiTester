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

    return (
        <div className={classes.FormUrlEncodedEditor}>
            {
                formControlls.map(formControll => {
                    return <FormControll key={uuidv4()} />
                })
            }
            <button onClick={addFormControllHandler} className={classes.AddFormControllButton}>Add Form Controll</button>
        </div>
    );
}

export default FormUrlEncodedEditor;