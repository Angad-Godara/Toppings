import NavList from './NavList';
import styles from './FooterNav.module.css';

const FooterNav = () => {
	const navList = [
		{
			title: 'Sitemap',
			links: [
				{
					title: 'Home',
					href: '/',
				},
			],
		},
		{
			title: 'Community',
			links: [
				{ title: 'Donate', href: 'https://github.com/sponsors/DarhkVoyd' },
				{
					title: 'Contribute',
					href: 'https://github.com/DarhkVoyd/Toppings/tree/dev',
				},
				{ title: 'Support', href: 'mailto:support@grabtoppings.xyz' },
			],
		},
	];
	return (
		<div className={styles['footer-nav']}>
			<div className={styles['list-group']}>
				{navList.map((category, i) => {
					return (
						<NavList key={i} title={category.title} links={category.links} />
					);
				})}
			</div>
			<div className={styles['list-group']}>
				{navList.map((category, i) => {
					return (
						<NavList key={i} title={category.title} links={category.links} />
					);
				})}
			</div>
		</div>
	);
};

export default FooterNav;
