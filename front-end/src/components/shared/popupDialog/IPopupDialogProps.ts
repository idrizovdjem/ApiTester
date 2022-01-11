export default interface IPopupDialogProps {
    isVisible: boolean;
    hide: () => void;
    message: string;
    header: string;
};