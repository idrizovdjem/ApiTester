import { useState, useEffect } from 'react';
import utilitiesService from '../../services/utilitiesService';

import classes from './Navigation.module.css';

const Navigation = () => {
    const [serverStatus, setServerStatus] = useState('DOWN');

    useEffect(() => {
        const fetchServerStatus = async () => {
            const statusResponse = await utilitiesService.getServerStatus();
            setServerStatus(statusResponse);
        }

        fetchServerStatus();
    });

    const serverStatusLabelColor = serverStatus === 'OK' ? '#116530' : 'red';

    return (
        <nav className={classes.Navigation}>
            <h3 className={classes.Logo}>Api Tester</h3>

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