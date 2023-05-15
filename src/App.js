import './App.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer/Footer';
import { useEffect } from 'react';
import navStyles from './Components/NavBar.module.css';
import heroStyles from './Components/HeroSection.module.css';
import ContentSection from './Components/ContentSection';
import HeroSection from './Components/HeroSection';
import { Navigate, Route, Routes } from 'react-router';
import Farewell from './Components/Farewell/Farewell';
import Greetings from './Components/Greetings/Greetings';
import { HashRouter } from 'react-router-dom';

function App() {
	useEffect(() => {
		const navbar = document.querySelector('nav');
		const hero = document.querySelector(`.${heroStyles.hero}`);
		const handleScroll = () => {
			const heroTop = hero.getBoundingClientRect().top + 40;
			const heroBottom = hero.getBoundingClientRect().bottom;
			if (heroTop <= 0) {
				navbar.classList.add(navStyles.fixed);
			} else {
				navbar.classList.remove(navStyles.fixed);
			}
			if (heroBottom <= 0) {
				navbar.classList.add(navStyles.active);
			} else {
				navbar.classList.remove(navStyles.active);
			}
		};
		window.addEventListener('scroll', handleScroll);

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return (
		<HashRouter>
			<Routes>
				<Route exact path='/' element={
					<div className="App">
						<NavBar />
						<HeroSection />
						<ContentSection />
						<Footer />
					</div>
				} />
				<Route exact path='/greetings' element={
					<div className="App">
						<NavBar />
						<Greetings />
					</div>
				} />
				<Route exact path='/farewell' element={
					<div className="App">
						<NavBar />
						<Farewell />
					</div>
				} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
