import classes from './Main.module.css';

import Search from '../Search/Search';
import SectionButtonsContainer from '../SectionButtonsContainer/SectionButtonsContainer';
import Headers from '../Headers/Headers';

const Main = () => {
    return (
        <main className={classes.Main}>
            <Search />
            <SectionButtonsContainer />
            <Headers />
        </main>
    );
}

export default Main;