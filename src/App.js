import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';
import navStyles from './components/NavBar.module.css';
import heroStyles from './components/HeroSection.module.css';
import ContentSection from './components/ContentSection';
import HeroSection from './components/HeroSection';

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
		<div className="App">
			<NavBar />
			<HeroSection />
			<ContentSection />
			<Footer />
		</div>
	);
}

export default App;
