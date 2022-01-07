import classes from './PageSplitter.module.css';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import SideBar from '../SideBar/SideBar';

const PageSplitter = (): JSX.Element => {
    return (
        <Splitter className={classes.PageSplitter}>
            <SplitterPanel size={20} minSize={10}>
                <SideBar />
            </SplitterPanel>

            <SplitterPanel size={80} minSize={70}>
                Main
            </SplitterPanel>
        </Splitter>
    );
};

export default PageSplitter;