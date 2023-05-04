/**
 * Global DOM Elements
 */
let playerSettingsBtn;
let playerSettingsPanel;
let playerSettingsMenu;
let initialDisplay = playerSettingsPanel?.style.display;
let defaultSpeedElement = Node;
let currentSpeedElement = defaultSpeedElement;
let toggleSpeed;
let currentSpeed = 1;

/**
 * Event Handlers
 */

const onPlaybackSpeedClicked = () => {
	const customSpeeds = document.querySelector('.custom-speed');
	if (!customSpeeds) {
		const customSpeedHeader = createPanelHeader({
			panelId: 'custom-speed-list-header',
			btnLabel: 'Back to previous menu',
			btnOnClick: (event) => {
				// Reset Settings Menu
				let i = 0;
				document.querySelector('#custom-speed-list-header').style.display =
					'none';
				while (document.getElementsByClassName('ytp-menuitem')[i]) {
					document.getElementsByClassName('ytp-menuitem')[i].style.display =
						initialDisplay;
					i = i + 1;
				}
				i = 0;
				while (document.getElementsByClassName('custom-speed')[i]) {
					document.getElementsByClassName('custom-speed')[i].style.display =
						'none';
					i = i + 1;
				}
			},
			panelTitle: 'Playback speed',
			panelOptions: { isPanelOptions: true, optionsTitle: 'Custom' },
		});

		let i = 0;
		while (document.getElementsByClassName('ytp-menuitem')[i]) {
			document.getElementsByClassName('ytp-menuitem')[i].style.display = 'none';
			i = i + 1;
		}

		playerSettingsMenu.append(
			...customSpeedList.map((speed) => {
				if (speed != 1) {
					return createMenuItem({
						itemId: `custom-${speed}x-speed`,
						itemClass: 'custom-speed',
						itemRole: 'menuitemradio',
						itemTabIndex: '0',
						itemLabel: speed.toString(),
						itemOnClick: (event) => {
							setPlaybackSpeed(speed);
							currentSpeedElement.ariaChecked = false;
							event.target.parentNode.ariaChecked = true;
							currentSpeedElement = event.target.parentNode;
							document
								.querySelector('#custom-speed-item')
								.querySelector('.ytp-menuitem-content').textContent =
								speed.toString();
						},
					});
				} else {
					return createMenuItem({
						itemId: 'custom-1x-speed',
						itemClass: 'custom-speed',
						itemRole: 'menuitemradio',
						itemTabIndex: '0',
						itemLabel: 'Normal',
						itemOnClick: (event) => {
							setPlaybackSpeed(1);
							currentSpeedElement.ariaChecked = false;
							event.target.parentNode.ariaChecked = true;
							currentSpeedElement = event.target.parentNode;
							document
								.querySelector('#custom-speed-item')
								.querySelector('.ytp-menuitem-content').textContent = 'Normal';
						},
					});
				}
			})
		);
		document.querySelector(`#custom-${currentSpeed}x-speed`).ariaChecked = true;
		currentSpeedElement = document.querySelector(
			`#custom-${currentSpeed}x-speed`
		);
		playerSettingsPanel.prepend(customSpeedHeader);
	} else {
		document.querySelector('#custom-speed-list-header').style.display =
			initialDisplay;

		let i = 0;
		while (document.getElementsByClassName('ytp-menuitem')[i]) {
			document.getElementsByClassName('ytp-menuitem')[i].style.display = 'none';
			i = i + 1;
		}
		i = 0;
		while (document.getElementsByClassName('custom-speed')[i]) {
			document.getElementsByClassName('custom-speed')[i].style.display =
				initialDisplay;
			i = i + 1;
		}
	}
};

const onSettingsClicked = () => {
	setTimeout(() => {
		if (document.querySelector('.custom-speed').style.display != 'none') {
			let i = 0;
			document.querySelector('#custom-speed-list-header').style.display =
				'none';
			while (document.getElementsByClassName('ytp-menuitem')[i]) {
				document.getElementsByClassName('ytp-menuitem')[i].style.display =
					initialDisplay;
				i = i + 1;
			}
			i = 0;
			while (document.getElementsByClassName('custom-speed')[i]) {
				document.getElementsByClassName('custom-speed')[i].style.display =
					'none';
				i = i + 1;
			}
		}
	}, 100);
};

/**
 * Watch Toppings
 */

const addSpeedToppings = () => {
	let customSpeedItem = document.querySelector('#custom-speed-item');
	if (!customSpeedItem) {
		customSpeedItem = createMenuItem({
			itemId: 'custom-speed-item',
			hasAriaPopUp: 'true',
			itemRole: 'menuitem',
			itemTabIndex: '0',
			itemIconPath:
				'M10,8v8l6-4L10,8L10,8z M6.3,5L5.7,4.2C7.2,3,9,2.2,11,2l0.1,1C9.3,3.2,7.7,3.9,6.3,5z            M5,6.3L4.2,5.7C3,7.2,2.2,9,2,11 l1,.1C3.2,9.3,3.9,7.7,5,6.3z            M5,17.7c-1.1-1.4-1.8-3.1-2-4.8L2,13c0.2,2,1,3.8,2.2,5.4L5,17.7z            M11.1,21c-1.8-0.2-3.4-0.9-4.8-2 l-0.6,.8C7.2,21,9,21.8,11,22L11.1,21z            M22,12c0-5.2-3.9-9.4-9-10l-0.1,1c4.6,.5,8.1,4.3,8.1,9s-3.5,8.5-8.1,9l0.1,1 C18.2,21.5,22,17.2,22,12z',
			itemLabel: 'Playback speed',
			itemContent: document.createTextNode(
				currentSpeed === 1 ? 'Normal' : currentSpeed.toString()
			),
			itemOnClick: onPlaybackSpeedClicked,
		});
		document.querySelectorAll('.ytp-menuitem')[2].remove();
		playerSettingsMenu.insertBefore(
			customSpeedItem,
			playerSettingsMenu.children[2]
		);
		initialDisplay =
			document.getElementsByClassName('ytp-menuitem')[0].style.display;
	}
};

const addToggleToppings = (event) => {
	if (event.key === 'x') {
		currentSpeed = getPlaybackSpeed();
		if (currentSpeed != toggleSpeed) {
			setPlaybackSpeed(toggleSpeed);
			currentSpeed = toggleSpeed;
		} else {
			setPlaybackSpeed(1);
			currentSpeed = 1;
		}
		if (document.querySelector('#custom-1x-speed')) {
			currentSpeedElement.ariaChecked = false;
			document.querySelector(
				`#custom-${currentSpeed}x-speed`
			).ariaChecked = true;
			currentSpeedElement = document.querySelector(
				`#custom-${currentSpeed}x-speed`
			);
			document
				.querySelector('#custom-speed-item')
				.querySelector('.ytp-menuitem-content').textContent =
				currentSpeed === 1 ? 'Normal' : currentSpeed.toString();
		} else if (document.querySelector('#custom-speed-item')) {
			document
				.querySelector('#custom-speed-item')
				.querySelector('.ytp-menuitem-content').textContent =
				currentSpeed === 1 ? 'Normal' : currentSpeed.toString();
		}
	}
};

/**
 * Watch Page Toppings
 */
const addWatchToppings = (obj, sender, response) => {
	const { type, contentID } = obj;
	toggleSpeed = 2;
	if (type === 'WATCH') {
		const body = document.body;
		const config = { childList: true, subtree: true };
		const callback = function (mutationsList, observer) {
			if (document.querySelector('.ytp-menuitem')) {
				playerSettingsMenu = document.querySelector('.ytp-panel-menu');
				playerSettingsBtn = document.querySelector('.ytp-settings-button');
				playerSettingsBtn.addEventListener('click', onSettingsClicked);
				playerSettingsPanel = document.querySelector('.ytp-panel');

				addSpeedToppings();
				observer.disconnect();
			}
		};
		const observer = new MutationObserver(callback);
		observer.observe(body, config);
		document.addEventListener('keydown', addToggleToppings);
	}
};

// Events
chrome.runtime.onMessage.addListener(addWatchToppings);
