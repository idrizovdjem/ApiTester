import { useContext } from 'react';
import RequestContext from '../../../contexts/RequestContext';
import classes from './SearchSection.module.css';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import RequestMethod from '../../../enums/RequestMethod';
import requestsService from '../../../services/requestsService';

interface IMethodOptions {
    label: string;
    value: RequestMethod;
};

const methodOptions: IMethodOptions[] = [
    { label: 'GET', value: RequestMethod.Get },
    { label: 'POST', value: RequestMethod.Post },
    { label: 'PUT', value: RequestMethod.Put },
    { label: 'DELETE', value: RequestMethod.Delete }
];

const SearchSection = (): JSX.Element => {
    const { request, setRequestProperty } = useContext(RequestContext);

    const onUrlInputHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        const newUrl: string = event.currentTarget.value;
        setRequestProperty('url', newUrl);
    }

    const onDropdownHandler = (event: DropdownChangeParams): void => {
        const newMethod: RequestMethod = event.value;
        setRequestProperty('method', newMethod);
    }

    const onSendButtonClickHandler = async (): Promise<void> => {
        await requestsService.sendRequestAsync(request);
    }

    return (
        <section className={classes.SearchSection}>
            <Dropdown
                options={methodOptions}
                className={classes.MethodDropdown}
                placeholder='Request method'
                value={request.method}
                onChange={onDropdownHandler}
            />

            <InputText
                className={classes.InputText}
                placeholder='Server url'
                spellCheck={false}
                value={request.url}
                onInput={onUrlInputHandler}
            />

            <Button
                className={classes.Button}
                label={'Send'}
                iconPos='right'
                icon='pi pi-fw pi-send'
                onClick={onSendButtonClickHandler}
            />
        </section>
    );
};

export default SearchSection;