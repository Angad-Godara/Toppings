import logo from '../assets/icon512.png';
import styles from './NavBar.module.css';

const NavBar = () => {
	return (
		<nav>
			<div className={styles.logo}>
				<img src={logo} alt="Toppings Logo" />
				<h1>Toppings</h1>
			</div>
			<div className={styles.cta}>
				<a
					href="https://chrome.google.com/webstore/detail/toppings/aemiblppibhggpgijajindcmmomboibl"
					target="_blank"
					rel="noreferrer"
					draggable="false"
				>
					Add to Chrome - It's Free
				</a>
			</div>
		</nav>
	);
};

export default NavBar;
