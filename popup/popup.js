document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#home').addEventListener('click', function () {
		document.querySelector('li.active').className = '';
		document.querySelector('li#home').className = 'active';

		document.querySelector('div.popup-content').innerHTML = ``;
	});

	document.querySelector('#notify').addEventListener('click', function () {
		document.querySelector('li.active').className = '';
		document.querySelector('li#notify').className = 'active';

		document.querySelector('div.popup-content').innerHTML = `
		<h1>You're all caught up!</h1>
		<p>Once you receive a new notification, it will appear here.</p>`;
	});

	document.querySelector('#settings').addEventListener('click', function () {
		window.open(chrome.runtime.getURL('options/options.html'));
	});

	document.querySelector('#help').addEventListener('click', function () {
		window.open('https://github.com/darhkvoyd/toppings');
	});
});

// DOM Elements
const toggleSwitch = document.querySelector('#toppings-toggle');

// Extract data from manifest
const version = chrome.runtime.getManifest().version;

document.getElementById('version').textContent = version;

// Listen for changes to the toggle switch
toggleSwitch.addEventListener('change', () => {
	// Send a message to the background script to toggle the extension on or off
	chrome.runtime.sendMessage({ type: 'toggle' });

	// Store the state of the toggle switch in local storage
	chrome.storage.local.set({ 'toppings-toggle': toggleSwitch.checked });
});

// Retrieve the state of the toggle switch from local storage
chrome.storage.local.get('toppings-toggle', (data) => {
	// Set the state of the toggle switch to the stored value or "on" if no value is found
	toggleSwitch.checked =
		data['toppings-toggle'] !== undefined ? data['toppings-toggle'] : true;
});
