import { useState } from 'react';
import classes from './Body.module.css';

import CodeEditor from './CodeEditor/CodeEditor';

const Body = () => {
    const [bodyType, setBodyType] = useState('json');
    const [fontSize, setFontSize] = useState('20px');
    const [fontTheme, setFontTheme] = useState('github');

    const getBodyEditor = () => {
        switch(bodyType) {
            case 'json': return <CodeEditor bodyType='json' fontSize={fontSize} theme={fontTheme} />
            case 'xml': return <CodeEditor bodyType='xml'fontSize={fontSize} theme={fontTheme} />
            case 'form url encoded': return 'form url encoded body';
            default: return null;
        }
    }

    const changeFontSizeHandler = (event) => {
        const newValue = event.target.value;
        if(newValue.endsWith('px') === false) {
            return;
        }

        const integerPart = newValue.substr(0, newValue.length - 2);
        if(integerPart === '') {
            setFontSize('px');
            return;
        }

        const pixelsValue = parseInt(integerPart);
        if(Number.isNaN(pixelsValue)) {
            return;
        }

        if(pixelsValue < 1) {
            return;
        }

        setFontSize(newValue);
    }

    const changeBodyTypeHandler = (event) => {
        const newBodyType = event.target.value.toLowerCase();
        setBodyType(newBodyType);
    }

    const changeThemeHandler = (event) => {
        const newTheme = event.target.value.toLowerCase();
        setFontTheme(newTheme);
    }

    return (
        <div className={classes.Body}>
            <div className={classes.BodyOptions}>
                <h3 className={classes.BodyTypeLabel}>Body Type: </h3>
                <select className={classes.BodyTypeSelect} onChange={changeBodyTypeHandler}>
                    <option>JSON</option>
                    <option>XML</option>
                    <option>Form URL Encoded</option>
                    <option>No Body</option>
                </select>

                <h3 className={classes.FontSizeLabel}>Font Size:</h3>
                <input className={classes.FontSizeInput} value={fontSize} onChange={changeFontSizeHandler} />

                <h3 className={classes.FontThemeLabel}>Font Theme:</h3>
                <select onChange={changeThemeHandler} className={classes.ThemeSelect}>
                    <option>Github</option>
                    <option>Chaos</option>
                    <option>Eclipse</option>
                    <option>XCode</option>
                    <option>Cobalt</option>
                    <option>Dracula</option>
                    <option>Iplastic</option>

                </select>
            </div>

            {getBodyEditor()}
        </div>
    );
}

export default Body;