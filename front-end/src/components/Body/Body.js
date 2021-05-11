import classes from './Body.module.css';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-github";


const Body = () => {
    return (
        <div className={classes.Body}>
            <div className={classes.BodyOptions}>
                <h3 className={classes.BodyTypeLabel}>Body Type: </h3>
                <select className={classes.BodyTypeSelect}>
                    <option>JSON</option>
                    <option>XML</option>
                    <option>Form URL Encoded</option>
                    <option>No Body</option>
                </select>
            </div>

            <div className={classes.Editor}>
                <AceEditor
                    mode="json"
                    theme="github"
                    name="UNIQUE_ID_OF_DIV"
                    fontSize='3vh'
                    editorProps={{ $blockScrolling: true }}
                    style={{
                        marginTop: '1vh',
                        width: '74%',
                        float: 'left',
                        height: '75vh'
                    }}
                />
            </div>
        </div>
    );
}

export default Body;