import { useContext } from 'react';
import AceEditor from 'react-ace';
import IBodyEditorProps from './IBodyEditorProps';
import BodyType from '../../../../../enums/BodyType';
import IEditorOptions from './IEdtorOptions';
import RequestContext from '../../../../../contexts/RequestContext';
import IBody from '../../../../../interfaces/IBody';

import 'brace/mode/json';
import 'brace/mode/xml';
import 'brace/theme/iplastic';

const editorOptions: IEditorOptions = {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showLineNumbers: true,
    tabSize: 4
};

const BodyEditor = (props: IBodyEditorProps): JSX.Element => {
    const { request, setRequestProperty } = useContext(RequestContext);

    const getMode = (): string => {
        switch(request.body.type) {
            case BodyType.Json: return 'json';
            case BodyType.Xml: return 'xml';
            default: return '';
        }
    }

    const onEditorChangeHandler = (value: string): void => {
        const requestBodyCopy: IBody = {...request.body};
        requestBodyCopy.value = value;
        setRequestProperty('body', requestBodyCopy); 
    }

    return (
        <AceEditor
            mode={getMode()}
            theme="iplastic"
            name="json-editor"
            fontSize={20}
            width="100%"
            height={`${props.availableHeight}px`}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={editorOptions}
            editorProps={{ $blockScrolling: true }}
            value={request.body.value}
            onChange={onEditorChangeHandler}
        />
    );
};

export default BodyEditor;