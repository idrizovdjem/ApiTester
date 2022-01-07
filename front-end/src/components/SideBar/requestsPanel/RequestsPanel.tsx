import { useState } from 'react';
import classes from './RequestsPanel.module.css';
import { Button } from 'primereact/button';
import CreateFolderDialog from '../createFolderDialog/CreateFolderDialog';
import IRequestFolder from '../../../interfaces/IRequestFolder';
import { PanelMenu } from 'primereact/panelmenu';
import IPanelMenuModel from '../../../interfaces/IPanelMenuModel';
import PopupDialog from '../../Shared/popupDialog/PopupDialog';

const RequestsPanel = (): JSX.Element => {
    const [createFolderDialogVisible, setCreateFolderDialogVisible] = useState<boolean>(false);
    const [popupDialogVisible, setPopupDialogVisible] = useState<boolean>(false);
    const [folders, setFolders] = useState<IRequestFolder[]>([]);

    const createFolder = (folderName: string): void => {
        const isNameAvailable: boolean = folders.every((folder: IRequestFolder) => folder.name !== folderName);
        if (isNameAvailable === false) {
            setPopupDialogVisible(true);
            return;
        }

        setFolders((oldFolders: IRequestFolder[]) => {
            const foldersCopy = [...oldFolders];
            const newFolder: IRequestFolder = { name: folderName };
            foldersCopy.push(newFolder);
            return foldersCopy;
        });
    }

    const mapToPanelMenuModel = (): IPanelMenuModel[] => {
        return folders.map((folder: IRequestFolder, index: number) => {
            const requestFolder: IPanelMenuModel = {
                label: folder.name,
                icon: 'pi pi-fw pi-folder',
                items: [],
            };
            
            requestFolder.items?.push({
                label: 'New request',
                icon: 'pi pi-fw pi-plus',
                items: undefined,
                command: (event) => { alert(index) }
            });

            return requestFolder;
        });
    }

    return (
        <div>
            <Button
                label="Create folder"
                className={`p-button-outlined ${classes.CreateFolderButton}`}
                onClick={() => setCreateFolderDialogVisible(true)}
            />

            <PopupDialog
                isVisible={popupDialogVisible}
                hide={() => setPopupDialogVisible(false)}
                message='Folder name is already in use'
                header='Invalid folder name'
            />

            <CreateFolderDialog
                isVisible={createFolderDialogVisible}
                hide={() => setCreateFolderDialogVisible(false)}
                createFolder={createFolder}
            />

            <PanelMenu model={mapToPanelMenuModel()} />
        </div>
    );
};

export default RequestsPanel;