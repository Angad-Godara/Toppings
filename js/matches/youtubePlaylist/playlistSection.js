export const playlistSection = () => {
	const playlistSectionExists = document.getElementsByClassName(
		'playlist-section'
	)[0];
	if (!playlistSectionExists) {
		// Playlist Section
		const playlistSection = document.createElement('div');
		playlistSection.className = 'playlist-section';

		// -> Section Header
		const panelHeader = document.createElement('div');
		panelHeader.className = 'playlist-header';

		// -> -> some Container
		const someContainer = document.createElement('div');

		// -> -> Panel Title
		const panelTitle = document.createElement('span');
		panelTitle.className = 'ytp-panel-title';
		panelTitle.setAttribute('tabindex', '0');
		const playlistContentText = document.createTextNode('Here goes playlist!');
		panelTitle.appendChild(playlistContentText);

		return playlistSection;
	}
};
