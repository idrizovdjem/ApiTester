import classes from './Navigation.module.css';

const Navigation = ({ serverStatus, setCurrentPage,  }) => {
    const serverStatusLabelColor = serverStatus === 'OK' ? '#116530' : 'red';

    return (
        <nav className={classes.Navigation}>
            <h3 className={classes.Logo}>Api Tester</h3>

            <div className={classes.Limitations} onClick={() => setCurrentPage('Limitations')}>
                <p className={classes.QuestionMark}>?</p>
            </div>

            <div className={classes.ServerStatusContainer}>
                <p className={classes.ServerStatusText}>Server Status: 
                    <span 
                        className={classes.ServerStatusLabel} 
                        style={{ color: serverStatusLabelColor }} 
                    >
                        {serverStatus}
                    </span>
                </p>
            </div>
        </nav>
    );
}

export default Navigation;