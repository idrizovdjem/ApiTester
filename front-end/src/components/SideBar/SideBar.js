import classes from './SideBar.module.css';

const SideBar = () => {
    return (
        <aside className={classes.SideBar}>
            <h3 className={classes.HistoryLabel}>History</h3>
            <div className={classes.HistoryContainer}>

            </div>
        </aside>
    )
}

export default SideBar;