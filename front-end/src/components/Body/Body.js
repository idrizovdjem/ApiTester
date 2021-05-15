import { useState } from 'react';
import classes from './Body.module.css';

import BodySidebar from './BodySidebar/BodySidebar';
import CodeEditor from '../CodeEditor/CodeEditor';
import FormUrlEncodedEditor from './FormUrlEncodedEditor/FormUrlEncodedEditor';

const Body = ({ body, setBody }) => {
    const [bodyType, setBodyType] = useState(body.type);
    const [fontSize, setFontSize] = useState('20px');
    const [fontTheme, setFontTheme] = useState('github');

    const bodyEditorStyle = {
        marginTop: '1vh',
        width: '74%',
        float: 'left',
        height: '75vh'
    };

    // TODO: Form url encoded add body
    const getBodyEditor = () => {
        switch (bodyType) {
            case 'json': return (
                <CodeEditor
                    fontSize={fontSize}
                    theme={fontTheme}
                    body={body}
                    updateBody={changeBodyHandler}
                    style={bodyEditorStyle}
                />
            );
            case 'xml': return (
                <CodeEditor
                    fontSize={fontSize}
                    theme={fontTheme}
                    body={body}
                    updateBody={changeBodyHandler}
                    style={bodyEditorStyle}
                />
            );
            case 'form url encoded': return (
                <FormUrlEncodedEditor
                    body={body}
                    updateBody={changeBodyHandler}
                />
            );
            default: return null;
        }
    }

    const changeBodyHandler = (newBody) => {
        setBody(oldBody => {
            oldBody.value = newBody;
            return oldBody;
        });
    }

    return (
        <div className={classes.Body}>
            <BodySidebar
                bodyType={body.type}
                fontSize={fontSize}
                fontTheme={fontTheme}
                setBodyType={setBodyType}
                setBody={setBody}
                setFontSize={setFontSize}
                setFontTheme={setFontTheme}
            />

            {getBodyEditor()}
        </div>
    );
}

export default Body;