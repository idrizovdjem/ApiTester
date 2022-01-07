export default interface IPanelMenuModel {
    label: string;
    icon: string;
    items: IPanelMenuModel[] | undefined;
    command?: (event: any) => void
};