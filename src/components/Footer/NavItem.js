import styles from './NavItem.module.css';

const NavItem = (props) => {
	return (
		<li className={styles['item-link']}>
			<a href={props.href}>{props.children}</a>
		</li>
	);
};

export default NavItem;
