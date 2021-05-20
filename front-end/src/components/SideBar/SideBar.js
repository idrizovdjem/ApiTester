import { v4 as uuidv4 } from 'uuid';
import classes from './SideBar.module.css';

const SideBar = ({ history, selectRequest }) => {
    return (
        <aside className={classes.SideBar}>
            <h3 className={classes.HistoryLabel}>History</h3>
            <div className={classes.HistoryContainer}>
                {
                    history.map((request, index) => {
                        return (
                            <div key={uuidv4()} onClick={() => selectRequest(index)} className={classes.Request}>
                                {request.url}
                            </div>
                        );
                    })
                }
            </div>
        </aside>
    )
}

export default SideBar;