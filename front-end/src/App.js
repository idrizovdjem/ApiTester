import { useState } from 'react';

import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';
import Main from './components/Main/Main';

const App = () => {
	const [serverStatus, setServerStatus] = useState('down');

	return (
		<div className="App">
			<Navigation serverStatus={serverStatus} setServerStatus={setServerStatus} />
			<SideBar />
			<Main serverStatus={serverStatus} />
		</div>
	);
}

export default App;
