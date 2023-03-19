const customMetadataHandler = async (playlistID) => {
	const metadataActionBar = document.querySelector('.metadata-action-bar');
	if (metadataActionBar) {
		const MetadataCustomWrapperExists = document.getElementsByClassName(
			'metadata-custom-wrapper'
		)[0];
		if (!MetadataCustomWrapperExists) {
			MetadataCustomWrapper = document.createElement('div');
			MetadataCustomWrapper.className =
				'metadata-text-wrapper style-scope ytd-playlist-header-renderer ' +
				'metadata-custom-wrapper';
		}
		metadataActionBar.insertBefore(
			MetadataCustomWrapper,
			metadataActionBar.lastChild.previousSibling
		);
		const playlistData = await getDuration(playlistID);
		mytext = `No of videos : ${playlistData.count} Average length of video : ${playlistData['avg_len']} Total length of playlist : ${playlistData.duration}`;
		const playlistDurationSection = createMetadataSection({
			sectionClass: 'playlist-duration',
			textContent: mytext,
		});
		MetadataCustomWrapper.appendChild(playlistDurationSection);
	} else {
		setTimeout(customMetadataHandler, 1000);
	}
};

// The encapsulations of all 'Playlist Toppings'
const youtubePlaylistHandler = (playlistID) => {
	customMetadataHandler(playlistID);
};

// Events
chrome.runtime.onMessage.addListener((obj, sender, response) => {
	const { type, value, playlistID } = obj;

	if (type === 'PLAYLIST') {
		// console.log(obj);
	}
	youtubePlaylistHandler(playlistID);
});

const getDuration = async (playlistId) => {
	const response = await fetch(
		`http://127.0.0.1:5000/v1/playlists/${playlistId}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		}
	);
	const playlistData = await response.json();
	return playlistData;
};
