import classes from './BodySidebar.module.css';

const BodySidebar = (props) => {
    const changeBodyTypeHandler = (event) => {
        const newBodyType = event.target.value;
        props.setBodyType(newBodyType);

        props.setHeaders(oldHeaders => {
            const newHeaders = oldHeaders.slice();
            const contentTypeHeader = newHeaders.find(header => header.key === 'content-type');

            // check if the new body type is no body
            if(newBodyType === 'no body') {
                if(contentTypeHeader === undefined) {
                    return newHeaders;
                }
                
                // if it is remove the content-type header if it is present
                const headerIndex = newHeaders.indexOf(contentTypeHeader);
                newHeaders.splice(headerIndex, 1);
                return newHeaders;
            }

            if(contentTypeHeader === undefined) {
                // check if the header is not present and add it
                newHeaders.push({ key: 'content-type', value: newBodyType });
            } else {
                // change content type header value
                contentTypeHeader.value = newBodyType;
            }

            return newHeaders;
        });
        
        props.setBody(oldBody => {
            oldBody.type = newBodyType;
            oldBody.value = newBodyType === 'application/x-www-form-urlencoded' ? [] : '';
            return oldBody;
        });
    }

    const changeFontSizeHandler = (event) => {
        const newValue = event.target.value;

        // check if the entered value is in pixels
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
                <option value='application/json'>JSON</option>
                <option value='application/xml'>XML</option>
                <option value='application/x-www-form-urlencoded'>Form URL Encoded</option>
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