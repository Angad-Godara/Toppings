// Playlist Runtime Section
const addRuntimeSection = async (playlistID) => {
	// Call API Handler to get data about playlist
	const response = await playlistsAPIHandler(playlistID);
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
const addMetadataToppings = async (playlistID) => {
	const metadataActionBar = document.querySelector('.metadata-action-bar');
	let MetadataToppings = document.querySelector('#metadata-toppings');
	if (!MetadataToppings) {
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
		MetadataToppings.append(await addRuntimeSection(playlistID));

		metadataActionBar.insertBefore(
			MetadataToppings,
			metadataActionBar.lastChild.previousSibling
		);
	} else {
		await playlistsAPIHandler(playlistID).then((response) => {
			document
				.getElementById('average-runtime')
				.querySelector('.item-value').textContent =
				response['data']['avg_runtime'];
			document
				.getElementById('total-runtime')
				.querySelector('.item-value').textContent = parse(
				response['data']['total_runtime']
			);
		});
	}
};

// The encapsulations of all 'Playlist Toppings'
const addPlaylistToppings = (obj, sender, response) => {
	const { type, contentID } = obj;
	if (type === 'PLAYLIST') {
		const body = document.body;
		const config = { childList: true, subtree: true };
		const callback = function (mutationsList, observer) {
			if (document.querySelector('.metadata-action-bar')) {
				addMetadataToppings(contentID);
				observer.disconnect();
			}
		};
		const observer = new MutationObserver(callback);
		observer.observe(body, config);
	}
};

// Events
chrome.runtime.onMessage.addListener(addPlaylistToppings);
