import { useState } from 'react';
import classes from './Body.module.css';

import BodySidebar from './BodySidebar/BodySidebar';
import CodeEditor from '../CodeEditor/CodeEditor';
import FormUrlEncodedEditor from './FormUrlEncodedEditor/FormUrlEncodedEditor';

const Body = ({ body, headers, changeRequestProperty }) => {
    const [bodyType, setBodyType] = useState(body.type);
    const [fontSize, setFontSize] = useState('20px');
    const [fontTheme, setFontTheme] = useState('github');

    const bodyEditorStyle = {
        marginTop: '1vh',
        width: '74%',
        float: 'left',
        height: '75vh'
    };

    const getBodyEditor = () => {
        switch (bodyType) {
            case 'application/json': return (
                <CodeEditor
                    fontSize={fontSize}
                    theme={fontTheme}
                    body={body}
                    updateBody={changeBodyHandler}
                    style={bodyEditorStyle}
                />
            );
            case 'application/xml': return (
                <CodeEditor
                    fontSize={fontSize}
                    theme={fontTheme}
                    body={body}
                    updateBody={changeBodyHandler}
                    style={bodyEditorStyle}
                />
            );
            case 'application/x-www-form-urlencoded': return (
                <FormUrlEncodedEditor
                    body={body}
                    updateBody={changeBodyHandler}
                />
            );
            default: return null;
        }
    }

    const changeBodyHandler = (newBody) => {
        const bodyObject = {...body};
        bodyObject.value = newBody;
        changeRequestProperty('body', bodyObject);
    }

    return (
        <div className={classes.Body}>
            <BodySidebar
                bodyType={body.type}
                fontSize={fontSize}
                fontTheme={fontTheme}
                body={body}
                setBodyType={setBodyType}
                setFontSize={setFontSize}
                setFontTheme={setFontTheme}
                headers={headers}
                changeRequestProperty={changeRequestProperty}
            />

            {getBodyEditor()}
        </div>
    );
}

export default Body;