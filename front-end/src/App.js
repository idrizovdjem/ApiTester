import { useState, useEffect } from 'react';

import utilitiesService from './services/utilitiesService';

import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';
import Main from './components/Main/Main';
import Limitations from './components/Limitations/Limitations';

const App = () => {
	const [serverStatus, setServerStatus] = useState('DOWN');
	const [currentPage, setCurrentPage] = useState('Main');

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

	let currentPageElement = <Main serverStatus={serverStatus} />;
	if(currentPage === 'Limitations') {
		currentPageElement = <Limitations />;
	}

	return (
		<div className="App">
			<Navigation 
				serverStatus={serverStatus} 
				setCurrentPage={setCurrentPage}
			/>
			<SideBar />
			{currentPageElement}
		</div>
	);
}

export default App;
