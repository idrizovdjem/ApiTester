import { TabView, TabPanel } from 'primereact/tabview';
import HeadersPanel from './headersPanel/HeadersPanel';

const TabsPanel = (): JSX.Element => {
    return (
        <section>
            <TabView>
                <TabPanel header="Headers">
                    <HeadersPanel />
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