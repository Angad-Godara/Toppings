// Custom Playback Speed btn On Click Properties
const onPlaybackSpeedBtnClicked = () => {
	// If custom speed header or speeds does not exists, create them and
	const customSpeedHeaderExists = document.getElementsByClassName(
		'custom-speed-list-header'
	)[0];
	const customSpeedExists = document.getElementsByClassName('custom-speed')[0];

	if (!customSpeedHeaderExists || !customSpeedExists) {
		// Creating Panel Header
		const customSpeedHeader = createPanelHeader({
			panelClass: 'custom-speed-list-header',
			btnLabel: 'Back to previous menu',
			btnOnClick: (event) => {
				// Reset Settings Menu
				let i = 0;
				document.getElementsByClassName(
					'custom-speed-list-header'
				)[0].style.display = 'none';
				while (document.getElementsByClassName('ytp-menuitem')[i]) {
					document.getElementsByClassName('ytp-menuitem')[
						i
					].style.display = initialDisplay;
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

		// Creating Speeds
		let i = 0;
		while (document.getElementsByClassName('ytp-menuitem')[i]) {
			document.getElementsByClassName('ytp-menuitem')[i].style.display = 'none';
			i = i + 1;
		}

		playerSettingsMenu.append(
			...customSpeedList.map((speed) => {
				if (speed != 1) {
					return createMenuItem({
						itemClass: 'custom-speed',
						itemRole: 'menuitemradio',
						itemTabIndex: '0',
						itemLabel: speed.toString(),
						itemOnClick: (event) => {
							playbackSpeedHandler(speed);
							currentPlaybackSpeed.ariaChecked = false;
							event.target.parentNode.ariaChecked = true;
							currentPlaybackSpeed = event.target.parentNode;
							document.getElementsByClassName(
								'custom-speed-item'
							)[0].children[2].textContent = speed.toString();
						},
					});
				} else {
					return createMenuItem({
						itemClass: 'custom-speed',
						itemRole: 'menuitemradio',
						itemTabIndex: '0',
						itemLabel: 'Normal',
						hasAriaChecked: 'true',
						itemOnClick: (event) => {
							playbackSpeedHandler(1);
							currentPlaybackSpeed.ariaChecked = false;
							event.target.parentNode.ariaChecked = true;
							currentPlaybackSpeed = event.target.parentNode;
							document.getElementsByClassName(
								'custom-speed-item'
							)[0].children[2].textContent = 'Normal';
						},
						options: (initialSpeedNode) => {
							defaultPlaybackSpeed = initialSpeedNode;
							currentPlaybackSpeed = initialSpeedNode;
						},
					});
				}
			})
		);

		// And Insert them
		playerSettingsPanel.prepend(customSpeedHeader);
	} else {
		// If custom speed header does exists, show it
		document.getElementsByClassName(
			'custom-speed-list-header'
		)[0].style.display = initialDisplay;

		// If Speeds exists show them
		let i = 0;
		while (document.getElementsByClassName('ytp-menuitem')[i]) {
			document.getElementsByClassName('ytp-menuitem')[i].style.display = 'none';
			i = i + 1;
		}
		i = 0;
		while (document.getElementsByClassName('custom-speed')[i]) {
			document.getElementsByClassName('custom-speed')[
				i
			].style.display = initialDisplay;
			i = i + 1;
		}
	}
};

// Definition of custom player speed topping
const playerSpeedHandler = () => {
	// Creating custom playback speed button for Menu
	const customSpeedItem = createMenuItem({
		itemClass: 'custom-speed-item',
		hasAriaPopUp: 'true',
		itemRole: 'menuitem',
		itemTabIndex: '0',
		itemIconPath:
			'M10,8v8l6-4L10,8L10,8z M6.3,5L5.7,4.2C7.2,3,9,2.2,11,2l0.1,1C9.3,3.2,7.7,3.9,6.3,5z            M5,6.3L4.2,5.7C3,7.2,2.2,9,2,11 l1,.1C3.2,9.3,3.9,7.7,5,6.3z            M5,17.7c-1.1-1.4-1.8-3.1-2-4.8L2,13c0.2,2,1,3.8,2.2,5.4L5,17.7z            M11.1,21c-1.8-0.2-3.4-0.9-4.8-2 l-0.6,.8C7.2,21,9,21.8,11,22L11.1,21z            M22,12c0-5.2-3.9-9.4-9-10l-0.1,1c4.6,.5,8.1,4.3,8.1,9s-3.5,8.5-8.1,9l0.1,1 C18.2,21.5,22,17.2,22,12z',
		itemLabel: 'Playback speed',
		itemContent: document.createTextNode('Normal'),
		itemOnClick: onPlaybackSpeedBtnClicked,
	});

	// When player setting btn is clicked!! Either custom btn has to be inserted or it already exists so menu should be reset
	playerSettingsBtn.addEventListener('click', () => {
		const customSpeedItemExists = document.getElementsByClassName(
			'custom-speed-item'
		)[0];
		// If custom playback btn does not exists, create it and replace original btn
		if (!customSpeedItemExists) {
			isSettingsMenuActivated = true;

			const playbackSpeedBtn = document.getElementsByClassName(
				'ytp-menuitem'
			)[2];
			playerSettingsMenu.replaceChild(customSpeedItem, playbackSpeedBtn);
			initialDisplay = document.getElementsByClassName('ytp-menuitem')[0].style
				.display;
		} else {
			// If custom playback btn does exists, reset the menu
			setTimeout(() => {
				let i = 0;
				document.getElementsByClassName(
					'custom-speed-list-header'
				)[0].style.display = 'none';
				while (document.getElementsByClassName('ytp-menuitem')[i]) {
					document.getElementsByClassName('ytp-menuitem')[
						i
					].style.display = initialDisplay;
					i = i + 1;
				}
				i = 0;
				while (document.getElementsByClassName('custom-speed')[i]) {
					document.getElementsByClassName('custom-speed')[i].style.display =
						'none';
					i = i + 1;
				}
			}, 100);
		}
	});
};

// The encapsulations of all watch toppings
const youtubeVideoHandler = () => {
	playerSpeedHandler();
};

youtubeVideoHandler();

// Events
chrome.runtime.onMessage.addListener((obj, sender, response) => {
	const { type, value, playlistID } = obj;

	if (type === 'WATCH') {
		console.log(obj);
	}
});
