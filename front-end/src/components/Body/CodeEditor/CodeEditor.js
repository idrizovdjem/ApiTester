import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";

import "ace-builds/src-noconflict/theme-iplastic";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-cobalt";

const CodeEditor = (props) => {
    return (
        <AceEditor
            mode={props.bodyType}
            theme={props.theme}
            fontSize={props.fontSize}
            editorProps={{ $blockScrolling: true }}
            style={{
                marginTop: '1vh',
                width: '74%',
                float: 'left',
                height: '75vh'
            }}
        />
    );
}

export default CodeEditor;