import classes from './Main.module.css';

import Search from '../Search/Search';
import SectionButtonsContainer from '../SectionButtonsContainer/SectionButtonsContainer';

const Main = () => {
    return (
        <main className={classes.Main}>
            <Search />
            <SectionButtonsContainer />
        </main>
    );
}

export default Main;