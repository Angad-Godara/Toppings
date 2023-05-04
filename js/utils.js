/**
 * GLOBAL CONSTANTS
 */
const minPlaybackRate = 0.0625;
const maxPlaybackRate = 16.0;
const customSpeedList = [0.25, 0.5, 1, 1.5, 1.75, 2, 2.5, 3];

/**
 * Utility
 */

// To fetch Toppings playlist API
const playlistsAPIHandler = async (playlistId) => {
	if (!playlistId) {
		playlistId = new URLSearchParams(window.location.search).get('list');
	}
	const httpResponse = await fetch(
		`https://toppings.pythonanywhere.com/v1/playlists/${playlistId}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		}
	);
	const response = await httpResponse.json();
	console.log('api was called');
	return response;
};

// To parse the datetime object into readable time
const parse = (runtime) => {
	let ts = runtime.seconds;
	let td = runtime.days;
	let th, tr, tm, ds;

	[th, tr] = [Math.floor(ts / 3600), ts % 3600];
	[tm, ts] = [Math.floor(tr / 60), tr % 60];

	ds = '';
	if (td) {
		ds += ` ${td} day${td !== 1 ? 's' : ''},`;
	}
	if (th) {
		ds += ` ${th} hour${th !== 1 ? 's' : ''},`;
	}
	if (tm) {
		ds += ` ${tm} minute${tm !== 1 ? 's' : ''},`;
	}
	if (ts) {
		ds += ` ${ts} second${ts !== 1 ? 's' : ''}`;
	}
	if (ds === '') {
		ds = '0 seconds';
	}

	return ds.trim().replace(/(^,)|(,$)/g, '');
};

// Set YouTube Player playback speed
const setPlaybackSpeed = (speed) => {
	if (speed > minPlaybackRate && speed < maxPlaybackRate) {
		document.querySelector('video').playbackRate = speed;
		return { type: 'SUCCESS', response: `Current Speed: ${speed}` };
	} else {
		return { type: 'ERROR', response: 'Invalid Speed' };
	}
};

// Get YouTube Player playback speed
const getPlaybackSpeed = () => {
	return document.querySelector('video').playbackRate;
};

/**
 * DOM Manipulation
 */

// To create a header for YouTube Player Menu
const createPanelHeader = (
	customHeader = {
		panelId: '',
		panelClass: '',
		btnLabel: '',
		btnOnClick: (event) => {},
		panelTitle: '',
		panelOptions: { isPanelOptions: false, optionsTitle: '' },
		options: (event) => {},
	}
) => {
	const PanelHeaderExists = document.getElementsByClassName(
		customHeader.panelClass
	)[0];
	if (!PanelHeaderExists) {
		// Panel Header
		const PanelHeader = document.createElement('div');
		if (!!customHeader.panelId) {
			PanelHeader.id = customHeader.panelId;
		}

		if (!!customHeader.className) {
			PanelHeader.className = 'ytp-panel-header ' + customHeader.panelClass;
		} else {
			PanelHeader.className = 'ytp-panel-header';
		}

		if (!!customHeader.options) {
			customHeader.options(PanelHeader);
		}

		// -> BackBtn Container
		const BackBtnContainer = document.createElement('div');
		BackBtnContainer.className = 'ytp-panel-back-button-container';
		BackBtnContainer.addEventListener('click', customHeader.btnOnClick);
		PanelHeader.appendChild(BackBtnContainer);

		// -> -> BackBtn
		const BackBtn = document.createElement('button');
		BackBtn.className = 'ytp-button ytp-panel-back-button';
		BackBtn.setAttribute('aria-label', customHeader.btnLabel);
		BackBtnContainer.appendChild(BackBtn);

		// -> Panel Title
		const PanelTitle = document.createElement('span');
		PanelTitle.className = 'ytp-panel-title';
		PanelTitle.setAttribute('tabindex', '0');
		const PanelHeaderText = document.createTextNode(customHeader.panelTitle);
		PanelTitle.appendChild(PanelHeaderText);
		PanelHeader.appendChild(PanelTitle);

		if (customHeader.panelOptions.isPanelOptions) {
			// ->Panel Options
			const PanelOptions = document.createElement('button');
			PanelOptions.className = 'ytp-button ytp-panel-options';
			const PanelOptionsText = document.createTextNode(
				customHeader.panelOptions.optionsTitle
			);
			PanelOptions.appendChild(PanelOptionsText);
			PanelHeader.appendChild(PanelOptions);
		}

		return PanelHeader;
	}
};

// To create a Menu Item for YouTube Player Menu
const createMenuItem = (
	customItem = {
		itemId: '',
		itemClass: '',
		hasAriaPopUp: '',
		hasAriaChecked: '',
		itemRole: '',
		itemTabIndex: '',
		itemIconPath: '',
		itemLabel: '',
		itemContent: Node,
		itemOnClick: (event) => {},
		options: (event) => {},
	}
) => {
	const MenuItemExists = document.getElementsByClassName(
		customItem.itemClass
	)[0];
	if (!MenuItemExists) {
		// Menu Item Wrapper
		const MenuItem = document.createElement('div');

		// Menu Item ID
		if (!!customItem.itemId) {
			MenuItem.id = customItem.itemId;
		}

		if (!!customItem.itemClass) {
			// Menu Item Class
			MenuItem.className = 'ytp-menuitem ' + customItem.itemClass;
		} else {
			MenuItem.className = 'ytp-menuitem';
		}

		if (!!customItem.hasAriaPopUp) {
			MenuItem.setAttribute('aria-haspopup', customItem.hasAriaPopUp);
		}
		if (!!customItem.hasAriaChecked) {
			MenuItem.setAttribute('aria-checked', customItem.hasAriaChecked);
		}
		if (!!customItem.itemRole) {
			MenuItem.setAttribute('role', customItem.itemRole);
		}
		if (!!customItem.itemTabIndex) {
			MenuItem.setAttribute('tabindex', customItem.itemTabIndex);
		}
		MenuItem.addEventListener('click', customItem.itemOnClick);
		if (!!customItem.options) {
			customItem.options(MenuItem);
		}

		if (!!customItem.itemIconPath) {
			// Menu Item Icon
			const MenuItemIcon = document.createElement('div');
			MenuItemIcon.className = 'ytp-menuitem-icon';
			const MenuItemIconSVG = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'svg'
			);
			const MenuItemSVGPath = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'path'
			);
			MenuItemIconSVG.setAttribute('height', '24');
			MenuItemIconSVG.setAttribute('width', '24');
			MenuItemIconSVG.setAttribute('viewBox', '0 0 24 24');
			MenuItemSVGPath.setAttribute('d', customItem.itemIconPath);
			MenuItemSVGPath.setAttribute('fill', 'white');
			MenuItemIconSVG.appendChild(MenuItemSVGPath);
			MenuItemIcon.appendChild(MenuItemIconSVG);
			MenuItem.appendChild(MenuItemIcon);
		}

		if (!!customItem.itemLabel) {
			// Menu Item Label
			const MenuItemLabel = document.createElement('div');
			MenuItemLabel.className = 'ytp-menuitem-label';
			const MenuItemLabelText = document.createTextNode(customItem.itemLabel);
			MenuItemLabel.appendChild(MenuItemLabelText);
			MenuItem.appendChild(MenuItemLabel);
		}

		if (!!customItem.itemContent) {
			// Menu Item Content
			const MenuItemContent = document.createElement('div');
			MenuItemContent.className = 'ytp-menuitem-content';
			MenuItemContent.appendChild(customItem.itemContent);
			MenuItem.appendChild(MenuItemContent);
		}

		return MenuItem;
	}
};

// To create a custom metadata section in the metadata action bar assuming its loaded
const createMetadataSection = (
	metadataSection = {
		sectionId: '',
		sectionClass: '',
		headerIcon: '',
		headerTitle: '',
		items: [],
		options: (event) => {},
	}
) => {
	const MetadataSectionExists = document.getElementsByClassName(
		metadataSection.sectionClass
	)[0];
	if (!MetadataSectionExists) {
		// Metadata Section Wrapper
		const MetadataSection = document.createElement('div');

		// Metadata Section ID
		if (!!metadataSection.sectionId) {
			MetadataSection.id = metadataSection.sectionId;
		}

		if (!!metadataSection.sectionClass) {
			// Metadata Section Class
			MetadataSection.className =
				'metadata-section ' + metadataSection.sectionClass;
		} else {
			MetadataSection.className = 'metadata-section';
		}

		if (!!metadataSection.options) {
			metadataSection.options(MetadataSection);
		}

		if (!!metadataSection.headerIcon) {
			// Metadata Section Icon
			const headerIcon = document.createElement('img');
			headerIcon.className = 'metadata-section-icon';
			headerIcon.src = metadataSection.headerIcon;
			MetadataSection.appendChild(headerIcon);
		}

		if (!!metadataSection.headerTitle) {
			// Metadata Section Title
			const headerTitle = document.createElement('h3');
			headerTitle.className = 'metadata-section-title';
			headerTitle.textContent = document.createTextNode(
				metadataSection.headerTitle
			);
			MetadataSection.appendChild(headerTitle);
		}

		if (!!metadataSection.items) {
			// Metadata Section Children
			MetadataSection.append(...metadataSection.items);
		}

		return MetadataSection;
	}
};

// To create section items to populate into metadata section
const createSectionItem = (
	item = {
		id: '',
		className: '',
		children: [],
		options: (event) => {},
	}
) => {
	const SectionItem = document.createElement('div');
	// Item ID
	if (!!item.id) {
		SectionItem.id = item.id;
	}

	if (!!item.className) {
		// Item Class
		SectionItem.className = 'section-item ' + item.className;
	} else {
		SectionItem.className = 'section-item';
	}

	if (!!item.options) {
		item.options(SectionItem);
	}

	SectionItem.append(...item.children);

	return SectionItem;
};
