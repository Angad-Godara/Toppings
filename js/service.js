// Constants
const uninstallUrl = 'https://grabtoppings.xyz/farewell';
const installUrl = 'https://grabtoppings.xyz/greetings';

// Content Scripts
const playlistScripts = ['js/utils.js', 'js/playlist.js'];
const watchScripts = ['js/utils.js', 'js/watch.js'];

// Stylesheets
const playlistCSS = ['css/playlist.css'];
const watchCSS = ['css/watch.css'];

// Installation and Uninstallation
chrome.runtime.setUninstallURL(uninstallUrl);

chrome.runtime.onInstalled.addListener(({ reason }) => {
	if (reason === 'install') {
		chrome.tabs.create({ url: installUrl });
	}
});

const sendContent = (tabId, content) => {
	chrome.tabs.sendMessage(tabId, {
		type: content.type,
		contentID: content.contentID,
	});
};

const getContent = (url) => {
	if (url.includes('youtube.com/playlist')) {
		const queryParameters = url.split('?')[1];
		const searchParams = new URLSearchParams(queryParameters);
		const playlistID = searchParams.get('list');
		return { type: 'PLAYLIST', contentID: playlistID };
	} else if (url.includes('youtube.com/watch')) {
		const queryParameters = url.split('?')[1];
		const searchParams = new URLSearchParams(queryParameters);
		const videoID = searchParams.get('v');
		return { type: 'WATCH', contentID: videoID };
	} else {
		return { type: 'INVALID' };
	}
};

chrome.webNavigation.onCompleted.addListener((details) => {
	const tabId = details.tabId;
	const content = getContent(details.url);
	if (content.type === 'INVALID') return;
	sendContent(tabId, content);
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
	const tabId = details.tabId;
	const content = getContent(details.url);
	if (content.type === 'INVALID') return;
	sendContent(tabId, content);
});
