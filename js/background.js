// Content Scripts
const youtubePlaylist = [
	'js/matches/youtubePlaylist/lib.js',
	'js/matches/youtubePlaylist/youtubePlaylistHandler.js',
];
const youtubeVideo = [
	'js/matches/youtubeVideo/lib.js',
	'js/matches/youtubeVideo/youtubeVideoHandler.js',
];

// Create a variable to keep track of injected tabs
const injectedPlaylistTabs = {};
const injectedWatchTabs = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (
		tab.url &&
		tab.url.includes('youtube.com/playlist') &&
		changeInfo.status === 'complete' &&
		!injectedPlaylistTabs[tabId]
	) {
		const queryParameters = tab.url.split('?')[1];
		const searchParams = new URLSearchParams(queryParameters);

		chrome.scripting
			.executeScript({
				target: { tabId: tabId },
				files: [
					'js/matches/youtubePlaylist/lib.js',
					'js/matches/youtubePlaylist/youtubePlaylistHandler.js',
				],
			})
			.then(() => {
				// Add the tab to the injected tabs list
				injectedPlaylistTabs[tabId] = true;
				chrome.tabs.sendMessage(tabId, {
					type: 'PLAYLIST',
					playlistID: searchParams.get('list'),
				});
			});
	} else if (
		tab.url &&
		tab.url.includes('youtube.com/watch') &&
		changeInfo.status === 'complete' &&
		!injectedWatchTabs[tabId]
	) {
		const queryParameters = tab.url.split('?')[1];
		const searchParams = new URLSearchParams(queryParameters);

		chrome.scripting
			.executeScript({
				target: { tabId: tabId },
				files: [
					'js/matches/youtubeVideo/lib.js',
					'js/matches/youtubeVideo/youtubeVideoHandler.js',
				],
			})
			.then(() => {
				// Add the tab to the injected tabs list
				injectedWatchTabs[tabId] = true;
				chrome.tabs.sendMessage(tabId, {
					type: 'WATCH',
					videoID: searchParams.get('v'),
				});
			});
	}
});
