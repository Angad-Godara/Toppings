const navbar = document.querySelector('nav');
const section1 = document.querySelector('.section1');

window.addEventListener('scroll', () => {
	const section1Bottom = section1.getBoundingClientRect().bottom;
	if (section1Bottom <= 0) {
		navbar.classList.add('fixed');
	} else {
		navbar.classList.remove('fixed');
	}
});
