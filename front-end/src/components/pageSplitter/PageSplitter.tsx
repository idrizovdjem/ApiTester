import classes from './PageSplitter.module.css';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import SideBar from '../sideBar/SideBar';
import Main from '../main/Main';

const PageSplitter = (): JSX.Element => {
    return (
        <Splitter className={classes.PageSplitter}>
            <SplitterPanel size={15} minSize={10}>
                <SideBar />
            </SplitterPanel>

            <SplitterPanel size={85} minSize={70}>
                <Main />
            </SplitterPanel>
        </Splitter>
    );
};

export default PageSplitter;