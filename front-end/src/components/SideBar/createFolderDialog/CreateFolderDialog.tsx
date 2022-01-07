import { useState } from 'react';
import classes from './CreateFolderDialog.module.css';
import ICreateFolderDialog from './ICreateFolderDialog';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const CreateFolderDialog = (props: ICreateFolderDialog): JSX.Element => {
    const [folderName, setFolderName] = useState<string>('');

    const onInputFieldChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        const newFolderName: string = event.currentTarget.value;
        setFolderName(newFolderName);
    }

    const onCreateButtonClickHandler = (): void => {
        props.createFolder(folderName);
        setFolderName('');
        props.hide();
    }

    return (
        <Dialog
            header="Create folder"
            visible={props.isVisible}
            onHide={props.hide}
        >
            <InputText 
                placeholder='Folder name' 
                className={classes.InputText} 
                value={folderName}
                onChange={onInputFieldChangeHandler}
            />

            <Button 
                label="Create" 
                className={classes.Button} 
                onClick={onCreateButtonClickHandler}
            />
        </Dialog>
    );
};

export default CreateFolderDialog;