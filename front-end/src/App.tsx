import { useState } from 'react';
import DefaultRequest from './defaultObjects/DefaultRequest';
import PageSplitter from './components/pageSplitter/PageSplitter';

import Main from './components/Main/Main';
import IRequest from './interfaces/IRequest';

const App = () => {
	const [currentPage, setCurrentPage] = useState('Main');
	const [history, setHistory] = useState<any[]>([]);
	const [headers, setHeaders] = useState([]);
	const [selectedRequest, setSelectedRequest] = useState<IRequest>(DefaultRequest);

	const selectRequest = (requestIndex: number) => {
		const request = { ...history[requestIndex] };
		setHeaders(request.headers);
		setSelectedRequest(request);
	}

	const changeRequestProperty = (key: string, value: any) => {
		if (key === 'headers') {
			setHeaders(value);
			return;
		}

		setSelectedRequest((oldRequest: IRequest) => {
			const newRequest: IRequest = { ...oldRequest };
			newRequest[key] = value;
			return newRequest;
		});
	}

	let currentPageElement = (
		<Main
			setHistory={setHistory}
			selectedRequest={selectedRequest}
			headers={headers}
			changeRequestProperty={changeRequestProperty}
		/>
	);

	return <PageSplitter />;
}

export default App;
