import styles from './NavList.module.css';
import NavItem from './NavItem';
const NavList = (props) => {
	return (
		<div className={styles['nav-list']}>
			<h4>{props.title}</h4>
			<ul className={styles['item-list']}>
				{props.links.map((link, i) => {
					return (
						<NavItem key={i} href={link.href}>
							{link.title}
						</NavItem>
					);
				})}
			</ul>
		</div>
	);
};

export default NavList;
