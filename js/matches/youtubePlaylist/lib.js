/* Global DOM Elements */
const br = document.createElement('br');
let metadataActionBar = document.querySelector('.metadata-action-bar');

/*  Global Functions */

// To parse the datetime object into readable time
function parse(runtime) {
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
}

// To call the Toppings Playlist API
const playlistsAPIHandler = async (playlistId) => {
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
	return response;
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
		MetadataSection.id = metadataSection.sectionId;

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
	SectionItem.id = item.id;

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
