import classes from './Main.module.css';

import Search from '../Search/Search';

const Main = () => {
    return (
        <main className={classes.Main}>
            <Search />
        </main>
    );
}

export default Main;