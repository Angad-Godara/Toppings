const onPlaybackSpeedBtnClicked = () => {
	const customSpeedHeader = createPanelHeader(
		'custom-speed-list-header',
		'Back to previous menu',
		'Playback speed',
		{ isPanelOptions: true, optionsTitle: 'Custom' }
	);
	playerSettingsPanel.prepend(customSpeedHeader);
	while (document.getElementsByClassName('ytp-menuitem')[0]) {
		document.getElementsByClassName('ytp-menuitem')[0].remove();
	}

	playerSettingsMenu.append(
		createMenuItem({
			itemClass: 'custom-speed',
			itemRole: 'menuitemradio',
			itemTabIndex: '0',
			itemLabel: '0.25',
			itemOnClick: (event) => {
				playbackSpeedHandler(0.25);
				currentPlaybackSpeed.ariaChecked = false;
				event.target.parentNode.ariaChecked = true;
				currentPlaybackSpeed = event.target.parentNode;
			},
		}),
		createMenuItem({
			itemClass: 'custom-speed',
			itemRole: 'menuitemradio',
			itemTabIndex: '0',
			itemLabel: '0.5',
			itemOnClick: () => {
				playbackSpeedHandler(0.5);
				currentPlaybackSpeed.ariaChecked = false;
				event.target.parentNode.ariaChecked = true;
				currentPlaybackSpeed = event.target.parentNode;
			},
		}),
		createMenuItem({
			itemClass: 'custom-speed',
			itemRole: 'menuitemradio',
			itemTabIndex: '0',
			itemLabel: 'Normal',
			hasAriaChecked: 'true',
			itemOnClick: () => {
				playbackSpeedHandler(1);
				currentPlaybackSpeed.ariaChecked = false;
				event.target.parentNode.ariaChecked = true;
				currentPlaybackSpeed = event.target.parentNode;
			},
			options: (initialSpeedNode) => {
				defaultPlaybackSpeed = initialSpeedNode;
				currentPlaybackSpeed = initialSpeedNode;
			},
		}),
		createMenuItem({
			itemClass: 'custom-speed',
			itemRole: 'menuitemradio',
			itemTabIndex: '0',
			itemLabel: '2',
			itemOnClick: () => {
				playbackSpeedHandler(2);
				currentPlaybackSpeed.ariaChecked = false;
				event.target.parentNode.ariaChecked = true;
				currentPlaybackSpeed = event.target.parentNode;
			},
		}),
		createMenuItem({
			itemClass: 'custom-speed',
			itemRole: 'menuitemradio',
			itemTabIndex: '0',
			itemLabel: '3',
			itemOnClick: () => {
				playbackSpeedHandler(3);
				currentPlaybackSpeed.ariaChecked = false;
				event.target.parentNode.ariaChecked = true;
				currentPlaybackSpeed = event.target.parentNode;
			},
		}),
		createMenuItem({
			itemClass: 'custom-speed',
			itemRole: 'menuitemradio',
			itemTabIndex: '0',
			itemLabel: '4',
			itemOnClick: () => {
				playbackSpeedHandler(4);
				currentPlaybackSpeed.ariaChecked = false;
				event.target.parentNode.ariaChecked = true;
				currentPlaybackSpeed = event.target.parentNode;
			},
		}),
		createMenuItem({
			itemClass: 'custom-speed',
			itemRole: 'menuitemradio',
			itemTabIndex: '0',
			itemLabel: '8',
			itemOnClick: () => {
				playbackSpeedHandler(8);
				currentPlaybackSpeed.ariaChecked = false;
				event.target.parentNode.ariaChecked = true;
				currentPlaybackSpeed = event.target.parentNode;
			},
		}),
		createMenuItem({
			itemClass: 'custom-speed',
			itemRole: 'menuitemradio',
			itemTabIndex: '0',
			itemLabel: '16',
			itemOnClick: () => {
				playbackSpeedHandler(16);
				currentPlaybackSpeed.ariaChecked = false;
				event.target.parentNode.ariaChecked = true;
				currentPlaybackSpeed = event.target.parentNode;
			},
		})
	);
};

const playerSpeedHandler = () => {
	playerSettingsBtn.addEventListener(
		'click',
		() => {
			isSettingsMenuActivated = true;
			const playbackSpeedBtn = document.getElementsByClassName(
				'ytp-menuitem'
			)[2];
			playerSettingsMenu.replaceChild(customSpeedItem, playbackSpeedBtn);
		},
		{ once: true }
	);

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
};

const youtubeVideoHandler = () => {
	playerSpeedHandler();
};

window.onload = (event) => {
	youtubeVideoHandler();
};
