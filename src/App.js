import './App.css';
import Hero from './Components/Hero';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { useEffect } from 'react';
import navStyles from './Components/NavBar.module.css';
import heroStyles from './Components/Hero.module.css';
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
			<Hero />
			<Footer />
		</div>
	);
}

export default App;
