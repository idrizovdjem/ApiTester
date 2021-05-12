import classes from './FormUrlEncodedEditor.module.css';

import FormControll from './FormControll/FormControll';

const FormUrlEncodedEditor = () => {
    return (
        <div className={classes.FormUrlEncodedEditor}>
            <FormControll />
        </div>
    );
}

export default FormUrlEncodedEditor;