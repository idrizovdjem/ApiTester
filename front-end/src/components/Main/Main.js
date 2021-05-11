import { useState } from 'react';
import classes from './Main.module.css';

import Search from '../Search/Search';
import SectionButtonsContainer from '../SectionButtonsContainer/SectionButtonsContainer';
import Headers from '../Headers/Headers';
import Body from '../Body/Body';

const Main = () => {
    const [headers, setHeaders] = useState([]);
    const [currentTab, setCurrentTab] = useState('Body');

    const getCurrentTab = () => {
        switch(currentTab) {
            case 'Headers': return <Headers headers={headers} setHeaders={setHeaders} />
            case 'Body': return <Body />
            default: return <Headers headers={headers} setHeaders={setHeaders} />
        }
    }

    return (
        <main className={classes.Main}>
            <Search />
            <SectionButtonsContainer selectTab={setCurrentTab} />
            {getCurrentTab()}
        </main>
    );
}

export default Main;