import logo from '../assets/icon512.png';

import styles from './HeroSection.module.css';

const HeroSection = () => {
	return (
		<main className={styles.hero}>
			<div className={styles['hero-wrapper']}>
				<div className={styles['hero-content']}>
					<h2>Get the Most Out of Your YouTube Experience</h2>
					<h3>Toppings for Youtube</h3>
					<p>
						Toppings is a free extension for Google Chrome that enriches your
						YouTube experience. With Toppings, you can do more than just watch
						videos. Play at custom speed, calculate playlist runtime, and more!
					</p>
					<div className={styles.cta}>
						<a
							className={styles['cta-button']}
							href="https://chrome.google.com/webstore/detail/toppings/aemiblppibhggpgijajindcmmomboibl"
							target="_blank"
							rel="noreferrer"
							draggable="false"
						>
							Add to Chrome - It's Free
						</a>
						<p>Rating: ★★★★★</p>
					</div>
				</div>
				<div className={styles['hero-graphics']}>
					<img src={logo} alt="Toppings Logo" draggable="false"></img>
				</div>
			</div>
		</main>
	);
};

export default HeroSection;
