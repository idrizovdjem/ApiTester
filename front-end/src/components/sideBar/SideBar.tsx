import classes from './SideBar.module.css';
import { TabMenu } from 'primereact/tabmenu';
import { useState } from 'react';
import SidebarTab from '../../enums/SidebarTab';
import RequestsPanel from './requestsPanel/RequestsPanel';

const tabItems: any[] = [
    { label: 'Requests', icon: 'pi pi-fw pi-home', className: classes.TabItem },
    { label: 'History', icon: 'pi pi-fw pi-history', className: classes.TabItem },
];

const SideBar = () => {
    const [activeTab, setActiveTab] = useState<SidebarTab>(SidebarTab.Requests);

    const onTabChangeHandler = (event: any): void => {
        const selectedTabIndex: number = event.index;
        setActiveTab(selectedTabIndex);
    }

    const getSidebarPanel = (): JSX.Element => {
        switch(activeTab) {
            case SidebarTab.Requests: return <RequestsPanel />;
            case SidebarTab.History: return <></>;
            default: return <></>;
        }
    };

    return (
        <div>
            <TabMenu 
                model={tabItems} 
                activeIndex={activeTab}
                onTabChange={onTabChangeHandler}
            />
            { getSidebarPanel() }
        </div>
    )
}

export default SideBar;