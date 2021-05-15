import classes from './ResponseBody.module.css';

import CodeEditor from '../../CodeEditor/CodeEditor';

const ResponseBody = () => {
    const responseBodyEditorStyle = {
        marginTop: '1vh',
        width: '98%',
        float: 'left',
        height: '50vh',
        marginLeft: '1%',
        marginBottom: '1%'
    };

    return (
        <div className={classes.ResponseBody}>
            <div className={classes.ResponseBodyLabel}>Body</div>

            <CodeEditor
                bodyType='json'
                fontSize={'20px'}
                theme={'github'}
                body={'123'}
                updateBody={() => { }}
                style={responseBodyEditorStyle}
                isReadOnly
            />
        </div>
    );
}

export default ResponseBody;