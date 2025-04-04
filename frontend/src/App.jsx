import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
	return (
		<>
			<ScrollToTop />
			<Navbar />
			<main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6'>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default App;
