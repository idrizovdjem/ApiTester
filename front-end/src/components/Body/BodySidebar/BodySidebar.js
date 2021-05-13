import classes from './BodySidebar.module.css';

const BodySidebar = (props) => {
    const changeBodyTypeHandler = (event) => {
        const newBodyType = event.target.value.toLowerCase();
        props.setBodyType(newBodyType);
        props.setBody(oldBody => {
            oldBody.type = newBodyType;
            
            if(newBodyType === 'form url encoded') {
                oldBody.value = [];
            } else if(newBodyType === 'json' || newBodyType === 'xml') {
                oldBody.value = '';
            }

            return oldBody;
        });
    }

    const changeFontSizeHandler = (event) => {
        const newValue = event.target.value;
        if (newValue.endsWith('px') === false) {
            return;
        }

        const integerPart = newValue.substr(0, newValue.length - 2);
        if (integerPart === '') {
            props.setFontSize('px');
            return;
        }

        const pixelsValue = parseInt(integerPart);
        if (Number.isNaN(pixelsValue)) {
            return;
        }

        if (pixelsValue < 1) {
            return;
        }

        props.setFontSize(newValue);
    }

    const changeThemeHandler = (event) => {
        const newTheme = event.target.value.toLowerCase();
        props.setFontTheme(newTheme);
    }

    return (
        <aside className={classes.BodyOptions}>
            <h3 className={classes.BodyTypeLabel}>Body Type: </h3>
            <select value={props.bodyType} className={classes.BodyTypeSelect} onChange={changeBodyTypeHandler}>
                <option value='json'>JSON</option>
                <option value='xml'>XML</option>
                <option value='form url encoded'>Form URL Encoded</option>
                <option value='no body'>No Body</option>
            </select>

            <h3 className={classes.FontSizeLabel}>Font Size:</h3>
            <input className={classes.FontSizeInput} value={props.fontSize} onChange={changeFontSizeHandler} />

            <h3 className={classes.FontThemeLabel}>Font Theme:</h3>
            <select value={props.fontTheme} onChange={changeThemeHandler} className={classes.ThemeSelect}>
                <option value='github'>Github</option>
                <option value='chaos'>Chaos</option>
                <option value='eclipse'>Eclipse</option>
                <option value='xcode'>XCode</option>
                <option value='cobalt'>Cobalt</option>
                <option value='dracula'>Dracula</option>
                <option value='iplastic'>Iplastic</option>
            </select>
        </aside>
    );
}

export default BodySidebar;