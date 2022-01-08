import { useState } from 'react';
import PageSplitter from './components/pageSplitter/PageSplitter';
import RequestContext from './contexts/RequestContext';
import DefaultRequest from './defaultObjects/DefaultRequest';
import IRequest from './interfaces/IRequest';

const App = () => {
	const [request, setRequest] = useState<IRequest>(DefaultRequest);

	const setRequestProperty = (key: string, value: any): void => {
		setRequest((oldRequest: IRequest) => {
			const newRequest: IRequest = { ...oldRequest};
			newRequest[key] = value;
			return newRequest;
		});
	}

	return (
		<RequestContext.Provider value={{ request, setRequestProperty }}>
			<PageSplitter />
		</RequestContext.Provider>
	);
}

export default App;
