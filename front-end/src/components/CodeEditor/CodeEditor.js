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
            readOnly={props.isReadOnly}
            mode={props.bodyType}
            theme={props.theme}
            value={props.body.value}
            onChange={(newBody) => props.updateBody(newBody)}
            fontSize={props.fontSize}
            editorProps={{ $blockScrolling: true }}
            style={props.style}
        />
    );
}

export default CodeEditor;