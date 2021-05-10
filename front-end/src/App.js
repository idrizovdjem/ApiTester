import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';
import Main from './components/Main/Main';

const App = () => {
	return (
		<div className="App">
			<Navigation />
			<SideBar />
			<Main />
		</div>
	);
}

export default App;
