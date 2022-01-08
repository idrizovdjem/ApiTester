import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

interface IColumn {
    field: string;
    header: string;
};

const columns: IColumn[] = [
    { field: 'key', header: 'Key' },
    { field: 'value', header: 'Value' },
    { field: 'action', header: '' }
];

const HeadersPanel = (): JSX.Element => {
    const generateColumns = (): JSX.Element[] => {
        return columns.map((column: IColumn, index: number) => {
            let style = {};
            if (index === columns.length - 1) {
                style = { width: '80px' }
            }

            return (
                <Column
                    key={column.field}
                    field={column.field}
                    header={column.header}
                    style={style}
                />
            );
        });
    }

    const val = {
        key: <InputText value={'some key'} style={{ 'width': '100%' }} />,
        value: <InputText value={'some value'} style={{ 'width': '100%' }} />,
        action: <Button icon='pi pi-fw pi-times' className="p-button-danger" />
    };

    const otherElementsHeightSum = 215;
    const elementHeight: number = window.innerHeight - otherElementsHeightSum;

    return (
        <section>
            <div style={{ width: '100%', textAlign: 'right'}}>
                <Button
                    label='New'
                    iconPos='left'
                    style={{ marginBottom: '10px' }}
                    icon='pi pi-fw pi-plus'
                />
            </div>

            <DataTable
                value={[val, val]}
                responsiveLayout="scroll"
                style={{ height: `${elementHeight}px`, overflowY: 'auto' }}
            >
                { generateColumns() }
            </DataTable>
        </section>
    );
};

export default HeadersPanel;