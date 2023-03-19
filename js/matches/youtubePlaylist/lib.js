// Global DOM Elements
let metadataActionBar = document.querySelector('.metadata-action-bar');
let MetadataCustomWrapper = Node;

// Global Functions
const createMetadataSection = (
	metadataSection = {
		sectionClass: '',
		textContent: '',
		options: (event) => {},
	}
) => {
	const MetadataSectionExists = document.getElementsByClassName(
		metadataSection.sectionClass
	)[0];
	if (!MetadataSectionExists) {
		// Panel Header
		const MetadataSection = document.createElement('div');
		MetadataSection.className =
			'metadata-custom-section ' + metadataSection.sectionClass;

		if (!!metadataSection.options) {
			metadataSection.options(MetadataSection);
		}

		const heading = document.createElement('h2');
		heading.className = 'yt-simple-endpoint style-scope yt-formatted-string';
		const text = document.createElement('p');
		heading.textContent = 'Playlist Duration';
		text.textContent = metadataSection.textContent;
		MetadataSection.appendChild(heading);
		MetadataSection.appendChild(text);

		return MetadataSection;
	}
};
