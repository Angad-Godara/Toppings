import { playlistSection } from './playlistSection';

const youtubePlaylistHandler = () => {
	const playlistSectionContainer = document.getElementsByClassName(
		'metadata-action-bar'
	)[0];
	const playlistSection = playlistSection();
	playlistSectionContainer.appendChild(playlistSection);
	// const settingsBtn = document.getElementsByClassName('ytp-settings-button')[0];
	// settingsBtn.addEventListener(
	// 	'click',
	// 	() => {
	// 		youtubesettingsSpeedBar = document.getElementsByClassName(
	// 			'ytp-menuitem'
	// 		)[2];
	// 		youtubePanelMenu.replaceChild(settingsSpeedBar, youtubesettingsSpeedBar);
	// 	},
	// 	{ once: true }
	// );
};

export default youtubePlaylistHandler;
