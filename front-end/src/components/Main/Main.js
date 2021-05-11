import { useState } from 'react';
import classes from './Main.module.css';

import Search from '../Search/Search';
import SectionButtonsContainer from '../SectionButtonsContainer/SectionButtonsContainer';
import Headers from '../Headers/Headers';

const Main = () => {
    const [headers, setHeaders] = useState([]);

    return (
        <main className={classes.Main}>
            <Search />
            <SectionButtonsContainer />
            <Headers headers={headers} setHeaders={setHeaders} />
        </main>
    );
}

export default Main;