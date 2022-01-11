import { FormEvent, useContext } from 'react';
import IHeadersPanelProps from './IHeadersPanelProps';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import RequestContext from '../../../../contexts/RequestContext';
import IHeader from '../../../../interfaces/IHeader';
import defaultHeader from '../../../../defaultObjects/DefaultHeader';

interface IColumn {
    field: string;
    header: string;
};

const columns: IColumn[] = [
    { field: 'key', header: 'Key' },
    { field: 'value', header: 'Value' },
    { field: 'action', header: 'Action' }
];

const HeadersPanel = (props: IHeadersPanelProps): JSX.Element => {
    const { request, setRequestProperty } = useContext(RequestContext);

    const newButtonHeight = 46;
    const dataTableStyle = {
        height: `${props.availableHeight + newButtonHeight}px`,
        overflowY: 'auto',
    };

    const addNewHeader = (): void => {
        setRequestProperty('headers', [...request.headers, {...defaultHeader}]);
    }

    const removeHeader = (index: number): void => {
        const headersCopy: IHeader[] = [...request.headers];
        headersCopy.splice(index, 1);
        setRequestProperty('headers', headersCopy);
    }

    const onInputTextChangeHandler = (event: FormEvent<HTMLInputElement>, propertyName: string, index: number): void => {
        const headersCopy: IHeader[] = [...request.headers];
        const newValue: string = event.currentTarget.value;
        headersCopy[index][propertyName] = newValue;
        setRequestProperty('headers', headersCopy);
    }

    const getInputTextField = (propertyName: string, value: string, index: number, placeholder: string): JSX.Element => {
        return (
            <InputText 
                value={value} 
                style={{ width: '100%' }} 
                placeholder={placeholder}
                onInput={(event) => onInputTextChangeHandler(event, propertyName, index)}
            />
        );
    }

    const getRemoveButton = (index: number): JSX.Element => {
        return (
            <Button 
                icon='pi pi-fw pi-times' 
                className='p-button-danger' 
                onClick={() => removeHeader(index)}
            />
        );
    }

    const mapHeadersToRows = (): any[] => {
        return request.headers.map((header: IHeader, index: number) => {
            return {
                key: getInputTextField('key', header.key, index, 'Header key'),
                value: getInputTextField('value', header.value, index, 'Header value'),
                action: getRemoveButton(index)
            }
        });
    }

    return (
        <section>
            <div style={{ width: '100%', textAlign: 'right' }}>
                <Button
                    label='New'
                    iconPos='left'
                    style={{ marginBottom: '10px' }}
                    icon='pi pi-fw pi-plus'
                    onClick={addNewHeader}
                />
            </div>

            <DataTable
                value={mapHeadersToRows()}
                responsiveLayout="scroll"
                style={dataTableStyle}
            >
                <Column key={columns[0].field} field={columns[0].field} header={columns[0].header} />
                <Column key={columns[1].field} field={columns[1].field} header={columns[1].header} />
                <Column 
                    key={columns[2].field} 
                    field={columns[2].field} 
                    header={columns[2].header} 
                    style={{ width: '80px' }}
                />
            </DataTable>
        </section>
    );
};

export default HeadersPanel;