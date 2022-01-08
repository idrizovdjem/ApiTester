import { TabView, TabPanel } from 'primereact/tabview';

const TabsPanel = (): JSX.Element => {
    return (
        <section>
            <TabView>
                <TabPanel header="Headers">
                    <p>Headers</p>
                </TabPanel>

                <TabPanel header="Body">
                    <p>Body</p>
                </TabPanel>

                <TabPanel header="Request">
                    <p>Request</p>
                </TabPanel>

                <TabPanel header="Response">
                    <p>Response</p>
                </TabPanel>
            </TabView>
        </section>
    );
};

export default TabsPanel;