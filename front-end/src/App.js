import { useState, useEffect } from 'react';

import utilitiesService from './services/utilitiesService';

import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';
import Main from './components/Main/Main';
import Limitations from './components/Limitations/Limitations';

const App = () => {
	const [serverStatus, setServerStatus] = useState('DOWN');
	const [currentPage, setCurrentPage] = useState('Main');
	const [history, setHistory] = useState([]);
	const [headers, setHeaders] = useState([]);
	const [selectedRequest, setSelectedRequest] = useState({
		method: 'get',
		url: '',
		host: '',
		path: '',
		headers: [],
		body: { key: '', value: '' }
	});

	useEffect(() => {
		const fetchServerStatus = async () => {
			const statusResponse = await utilitiesService.getServerStatus();
			setServerStatus(statusResponse);
		}

		fetchServerStatus();

		const timer = setInterval(() => {
			// check server status every 3 minutes
			fetchServerStatus();
		}, 1000 * 180);

		return () => {
			clearInterval(timer);
		}
	});

	const selectRequest = (requestIndex) => {
		const request = {...history[requestIndex]};
		setHeaders(request.headers);
		setSelectedRequest(request);
	}

	const changeRequestProperty = (key, value) => {
		if(key === 'headers') {
			setHeaders(value);
			return;
		}

		setSelectedRequest(oldRequest => {
			oldRequest[key] = value;
			return oldRequest;
		});
	}

	let currentPageElement = (
		<Main 
			serverStatus={serverStatus} 
			setHistory={setHistory} 
			selectedRequest={selectedRequest} 
			headers={headers}
			changeRequestProperty={changeRequestProperty} 
		/>
	);

	if (currentPage === 'Limitations') {
		currentPageElement = <Limitations setCurrentPage={setCurrentPage} />;
	}

	return (
		<div className="App">
			<Navigation
				serverStatus={serverStatus}
				setCurrentPage={setCurrentPage}
			/>
			<SideBar history={history} selectRequest={selectRequest} />
			{currentPageElement}
		</div>
	);
}

export default App;
