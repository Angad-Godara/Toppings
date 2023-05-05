import styles from './Footer.module.css';

const Footer = () => {
	return (
		<footer>
			<div className={styles.container}>
				<div className={styles.row}>
					<div className={styles['col-md-4']}>
						<h4>Developers</h4>
						<ul className={styles['list-unstyled']}>
							<li>
								<a href="https://github.com/DarhkVoyd/Toppings">
									Contribute to Toppings
								</a>
							</li>
							<li>
								<a href="https://github.com/sponsors/DarhkVoyd">Donations</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
