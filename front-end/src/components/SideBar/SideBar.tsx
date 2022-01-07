import { TabMenu } from 'primereact/tabmenu';

const tabItems: any[] = [
    {label: 'Requests', icon: 'pi pi-fw pi-home'},
    {label: 'History', icon: 'pi pi-fw pi-history'},
];

const SideBar = () => {
    return (
        <div>
            <TabMenu model={tabItems}/>
        </div>
    )
}

export default SideBar;