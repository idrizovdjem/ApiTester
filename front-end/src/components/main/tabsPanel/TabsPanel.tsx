import { TabView, TabPanel } from 'primereact/tabview';
import BodyPanel from './bodyPanel/BodyPanel';
import HeadersPanel from './headersPanel/HeadersPanel';

const TabsPanel = (): JSX.Element => {
    return (
        <section>
            <TabView>
                <TabPanel header="Headers">
                    <HeadersPanel />
                </TabPanel>

                <TabPanel header="Body">
                    <BodyPanel />
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