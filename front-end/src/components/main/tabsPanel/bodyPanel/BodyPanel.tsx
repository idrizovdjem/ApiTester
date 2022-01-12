import classes from './BodyPanel.module.css';
import BodyEditor from './bodyEditor/BodyEditor';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import BodyType from '../../../../enums/BodyType';
import { useContext } from 'react';
import RequestContext from '../../../../contexts/RequestContext';
import IBodyTypeDropdownOption from './IBodyTypeDropdownOption';

const dropdownOptions: IBodyTypeDropdownOption[] = [
    { label: 'No body', value: BodyType.NoBody },
    { label: 'Json', value: BodyType.Json },
    { label: 'Xml', value: BodyType.Xml }
];

const BodyPanel = (): JSX.Element => {
    const availableHeight: number = window.innerHeight - 230;

    const { request, setRequestProperty } = useContext(RequestContext);

    const onDropdownChangeHandler = (event: DropdownChangeParams): void => {
        const newBodyType: BodyType = event.value;
        const requestBodyCopy = {...request.body, type: newBodyType };
        
        if(newBodyType === BodyType.NoBody) {
            requestBodyCopy.value = '';
        }

        setRequestProperty('body', requestBodyCopy);
    }

    const getBodyElement = (): JSX.Element => {
        switch(request.body.type) {
            case BodyType.NoBody: return <></>;
            case BodyType.Json: return <BodyEditor availableHeight={availableHeight} />;
            case BodyType.Xml: return <BodyEditor availableHeight={availableHeight} />
        }
    }

    return (
        <section>
            <h3 className={classes.BodyTypeHeader}>Body type</h3>

            <Dropdown 
                value={request.body.type}
                options={dropdownOptions}
                className={classes.BodyTypeDropdown}
                onChange={onDropdownChangeHandler}
            />

            { getBodyElement() }
        </section>
    );
};

export default BodyPanel;