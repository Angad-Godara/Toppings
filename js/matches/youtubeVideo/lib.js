// GLOBAL CONSTANTS
const minPlaybackRate = 0.0625;
const maxPlaybackRate = 16.0;

// Global Variables
const playerSettingsBtn = document.getElementsByClassName(
	'ytp-settings-button'
)[0];
const playerSettingsPanel = document.getElementsByClassName('ytp-panel')[0];
const playerSettingsMenu = document.getElementsByClassName('ytp-panel-menu')[0];
let isSettingsMenuActivated = false;
let playbackSpeedBtn = HTMLDivElement;
let defaultPlaybackSpeed = Node;
let currentPlaybackSpeed = defaultPlaybackSpeed;

// Global Functions
const playbackSpeedHandler = (speed) => {
	if (speed > minPlaybackRate && speed < maxPlaybackRate) {
		document.querySelector('video').playbackRate = speed;
	}
};

const createMenuItem = (
	customItem = {
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
		// Menu Item
		const MenuItem = document.createElement('div');
		MenuItem.className = 'ytp-menuitem ' + customItem.itemClass;
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

const createPanelHeader = (panelClass, btnLabel, panelTitle, panelOptions) => {
	const PanelHeaderExists = document.getElementsByClassName(panelClass)[0];
	if (!PanelHeaderExists) {
		// Panel Header
		const PanelHeader = document.createElement('div');
		PanelHeader.className = 'ytp-panel-header ' + panelClass;

		// -> BackBtn Container
		const BackBtnContainer = document.createElement('div');
		BackBtnContainer.className = 'ytp-panel-back-button-container';
		PanelHeader.appendChild(BackBtnContainer);

		// -> -> BackBtn
		const BackBtn = document.createElement('button');
		BackBtn.className = 'ytp-button ytp-panel-back-button';
		BackBtn.setAttribute('aria-label', btnLabel);
		BackBtnContainer.appendChild(BackBtn);

		// -> Panel Title
		const PanelTitle = document.createElement('span');
		PanelTitle.className = 'ytp-panel-title';
		PanelTitle.setAttribute('tabindex', '0');
		const PanelHeaderText = document.createTextNode(panelTitle);
		PanelTitle.appendChild(PanelHeaderText);
		PanelHeader.appendChild(PanelTitle);

		if (panelOptions.isPanelOptions) {
			// ->Panel Options
			const PanelOptions = document.createElement('button');
			PanelOptions.className = 'ytp-button ytp-panel-options';
			const PanelOptionsText = document.createTextNode(
				panelOptions.optionsTitle
			);
			PanelOptions.appendChild(PanelOptionsText);
			PanelHeader.appendChild(PanelOptions);
		}

		return PanelHeader;
	}
};
