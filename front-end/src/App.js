import { useState, useEffect } from 'react';

import utilitiesService from './services/utilitiesService';

import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';
import Main from './components/Main/Main';

const App = () => {
	const [serverStatus, setServerStatus] = useState('DOWN');

	useEffect(() => {
        const fetchServerStatus = async () => {
            const statusResponse = await utilitiesService.getServerStatus();
            setServerStatus(statusResponse);
        }

		fetchServerStatus();

        setInterval(() => {
			// check server status every 3 minutes
			fetchServerStatus();
		}, 1000 * 180);
    });

	return (
		<div className="App">
			<Navigation serverStatus={serverStatus} setServerStatus={setServerStatus} />
			<SideBar />
			<Main serverStatus={serverStatus} />
		</div>
	);
}

export default App;
