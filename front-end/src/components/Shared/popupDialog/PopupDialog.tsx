import { Dialog } from 'primereact/dialog';
import IPopupDialogProps from './IPopupDialogProps';

const PopupDialog = (props: IPopupDialogProps): JSX.Element => {
    
    return (
        <Dialog 
            position={'top'} 
            onHide={props.hide}
            visible={props.isVisible}
            header={props.header}
            draggable={false}
            style={{ width: '350px' }}
        >
            <p className="p-m-0">{ props.message }</p>
        </Dialog>
    );
};

export default PopupDialog;