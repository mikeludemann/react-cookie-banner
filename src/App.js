import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Cookiebanner } from './components/cookiebanner';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			<section className="content">
				<Cookiebanner
					nameCookie="cookie-law"
					activeDays={365}
					color="#fff"
					bgcolor="#000"
					colorhover="#fff"
					bgcolorhover="#ccc"
					message="These website use cookies."
					dataSecurity="Data Security"
					dataSecurityLink="#"
					accept="Accept"
				></Cookiebanner>
			</section>
			<footer className="App-footer">
				(c) Copyright - Mike Ludemann
			</footer>
		</div>
	);
}

export default App;
