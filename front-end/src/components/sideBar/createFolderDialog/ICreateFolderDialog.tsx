export default interface ICreateFolderDialog {
    isVisible: boolean;
    hide: () => void;
    createFolder: (folderName: string) => void;
};