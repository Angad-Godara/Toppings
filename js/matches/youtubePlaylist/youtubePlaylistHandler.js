// Import CSS
let link = document.createElement('link');
link.rel = 'stylesheet';
link.href = chrome.runtime.getURL('css/playlist.css');
document.head.appendChild(link);

// Playlist Runtime Section
const playlistRuntimeSection = async (playlistID) => {
	// Call API Handler to get data about playlist
	const response = await playlistsAPIHandler(playlistID);
	console.log(response);
	// Average Runtime Item
	const AverageRuntimeLabel = document.createElement('span');
	AverageRuntimeLabel.setAttribute('class', 'average-runtime item-label');
	AverageRuntimeLabel.appendChild(document.createTextNode('Average Runtime: '));

	const AverageRuntimeValue = document.createElement('span');
	AverageRuntimeValue.setAttribute('class', 'average-runtime item-value');
	AverageRuntimeValue.appendChild(
		document.createTextNode(response['data']['avg_runtime'])
	);

	const AverageRuntime = createSectionItem({
		id: 'average-runtime',
		children: [AverageRuntimeLabel, AverageRuntimeValue],
	});

	const TotalRuntimeLabel = document.createElement('span');
	TotalRuntimeLabel.setAttribute('class', 'total-runtime item-label');
	TotalRuntimeLabel.appendChild(document.createTextNode('Total Runtime: '));

	const TotalRuntimeValue = document.createElement('span');
	TotalRuntimeValue.setAttribute('class', 'total-runtime item-value');
	TotalRuntimeValue.appendChild(
		document.createTextNode(parse(response['data']['total_runtime']))
	);

	const TotalRuntime = createSectionItem({
		id: 'total-runtime',
		children: [TotalRuntimeLabel, TotalRuntimeValue],
	});

	const PlaylistRuntimeSection = createMetadataSection({
		sectionId: 'playlist-runtime-section',
		items: [AverageRuntime, TotalRuntime],
	});

	return PlaylistRuntimeSection;
};

// Encapsulations of all Metadata Toppings
const metadataToppingsHandler = async (playlistID) => {
	const metadataActionBar = document.querySelector('.metadata-action-bar');
	if (metadataActionBar) {
		const MetadataToppingsExists = document.getElementById('metadata-toppings');
		if (!MetadataToppingsExists) {
			// Toppings Wrapper
			MetadataToppings = document.createElement('div');
			MetadataToppings.className =
				'metadata-text-wrapper style-scope ytd-playlist-header-renderer';
			MetadataToppings.id = 'metadata-toppings';

			// -> Header
			const ToppingsHeader = document.createElement('div');
			ToppingsHeader.id = 'toppings-header';

			// -> -> Header Icon
			const ToppingsIcon = document.createElement('img');
			ToppingsIcon.src = chrome.runtime.getURL('assets/icons/icon256.png');
			ToppingsIcon.id = 'toppings-icon';

			// -> -> Header Heading
			const ToppingsHeading = document.createElement('h2');
			ToppingsHeading.id = 'toppings-heading';
			ToppingsHeading.textContent = 'Toppings';

			ToppingsHeader.append(ToppingsIcon, ToppingsHeading);
			MetadataToppings.appendChild(ToppingsHeader);

			metadataActionBar.insertBefore(
				MetadataToppings,
				metadataActionBar.lastChild.previousSibling
			);
		}

		MetadataToppings.append(await playlistRuntimeSection(playlistID));
	} else {
		setTimeout(metadataToppingsHandler, 500);
	}
};

// The encapsulations of all 'Playlist Toppings'
const youtubePlaylistHandler = (playlistID) => {
	metadataToppingsHandler(playlistID);
};

// Events
chrome.runtime.onMessage.addListener((obj, sender, response) => {
	const { type, playlistID } = obj;

	if (type === 'PLAYLIST') {
		youtubePlaylistHandler(playlistID);
	}
});
